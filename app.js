const SUPABASE_URL = "https://vuwqqcfptvlgikjczpqx.supabase.co";
const SUPABASE_KEY = "sb_publishable_7BqYGds7iv0CJtMXn5Zqxg_NmuAz2bh";

// Tablas que se guardan por separado para cada bar (columna "bar")
const TABLAS_POR_BAR = [
    "productos",
    "categorias",
    "ochenta_y_seis",
    "ciento_uno",
    "entradas",
    "facturas",
    "recetas"
];

// Envuelve el cliente: toda lectura/edición/borrado de esas tablas se limita
// al bar actual, y todo lo que se inserta queda marcado con ese bar.
function crearClientePorBar(cliente) {

    function conBar(datos) {

        const bar = barActual();

        if (Array.isArray(datos)) {

            return datos.map(function(d) {

                return Object.assign({ bar: bar }, d);
            });
        }

        return Object.assign({ bar: bar }, datos);
    }

    return new Proxy(cliente, {

        get(destino, prop) {

            if (prop === "from") {

                return function(tabla) {

                    const q = destino.from(tabla);

                    if (TABLAS_POR_BAR.indexOf(tabla) === -1) return q;

                    return {
                        select: function(...a) {
                            return q.select(...a).eq("bar", barActual());
                        },
                        insert: function(datos, ...r) {
                            return q.insert(conBar(datos), ...r);
                        },
                        upsert: function(datos, ...r) {
                            return q.upsert(conBar(datos), ...r);
                        },
                        update: function(...a) {
                            return q.update(...a).eq("bar", barActual());
                        },
                        delete: function(...a) {
                            return q.delete(...a).eq("bar", barActual());
                        }
                    };
                };
            }

            const v = destino[prop];

            return typeof v === "function" ? v.bind(destino) : v;
        }
    });
}

const supabaseClient = crearClientePorBar(
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    )
);


// ========================================
// EMAILJS (envío de reportes por correo)
// Reemplazá estos 3 valores con los tuyos
// desde el panel de emailjs.com
// ========================================

const EMAILJS_PUBLIC_KEY = "c0x871xfoRP37AgYL";
const EMAILJS_SERVICE_ID = "service_6fnyifi";
const EMAILJS_TEMPLATE_ID = "template_5jrtc14";

if (window.emailjs) {

    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}


// ========================================
// ELEMENTOS GENERALES
// ========================================

const loginForm = document.getElementById("login-form");
const logoutBtn = document.getElementById("logout-btn");


// ========================================
// LOGIN
// ========================================

if (loginForm) {

    loginForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const mensaje = document.getElementById("mensaje");

        mensaje.textContent = "Ingresando...";

        const { data: datosLogin, error } =
            await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

        if (error) {

            console.error("Error de login:", error);

            mensaje.textContent =
                "Correo o contraseña incorrectos.";

            return;
        }

        const cargo =
            await obtenerCargo(datosLogin.user.id);

        if (cargo.error || !cargo.rol) {

            await supabaseClient.auth.signOut();

            mensaje.textContent =
                cargo.error
                    ? "No se pudo verificar tu cargo. Intenta de nuevo."
                    : "Tu cuenta aún no tiene un cargo asignado. " +
                      "Pídele al encargado principal que te lo asigne.";

            return;
        }

        mensaje.textContent =
            "¡Inicio de sesión correcto!";

        setTimeout(function() {

            window.location.href = "dashboard.html";

        }, 500);
    });
}


// ========================================
// CARGO (ROL) DEL USUARIO
// ========================================

let rolUsuario = null;


async function obtenerCargo(userId) {

    const { data, error } =
        await supabaseClient
            .from("perfiles")
            .select("rol")
            .eq("id", userId)
            .maybeSingle();

    if (error) {

        console.error(
            "Error obteniendo el cargo:",
            error
        );

        return { rol: null, error: error };
    }

    return {
        rol: data ? data.rol : null,
        error: null
    };
}


function esMaster() {

    return rolUsuario === "master";
}


function esRestringido() {

    return (
        rolUsuario === "cocina" ||
        rolUsuario === "barra" ||
        rolUsuario === "cocina_babilonia" ||
        rolUsuario === "barra_babilonia"
    );
}


function puedeVerCostos() {

    return (
        rolUsuario === "master" ||
        rolUsuario === "admin"
    );
}


function formatoPeso(valor) {

    return "$" + Number(valor || 0).toLocaleString("es-CL");
}


// Devuelve { producto_id: { costo_unitario, precio_venta } }
// Solo master y admin; para otros cargos devuelve {}

async function obtenerCostos() {

    if (!puedeVerCostos()) return {};

    const { data, error } =
        await supabaseClient
            .from("producto_costos")
            .select("producto_id, costo_unitario, precio_venta");

    if (error) {

        console.error(
            "Error cargando costos:",
            error
        );

        return {};
    }

    const mapa = {};

    data.forEach(function(c) {

        mapa[c.producto_id] = c;
    });

    return mapa;
}


async function guardarCostos(productoId) {

    const costo =
        parseFloat(
            document.getElementById("producto-costo").value
        ) || 0;

    const venta =
        parseFloat(
            document.getElementById("producto-venta").value
        ) || 0;

    const { error } =
        await supabaseClient
            .from("producto_costos")
            .upsert(
                {
                    producto_id: productoId,
                    costo_unitario: costo,
                    precio_venta: venta
                },
                { onConflict: "producto_id" }
            );

    if (error) {

        console.error(
            "Error guardando costos:",
            error
        );

        return false;
    }

    return true;
}


// ========================================
// CREAR CUENTA (login-barista.html y login-babilonia.html)
// ========================================

const registroForm =
    document.getElementById("registro-form");

const loginTabs =
    document.querySelectorAll(".login-tab");


if (registroForm && loginForm) {

    loginTabs.forEach(function(tab) {

        tab.addEventListener("click", function() {

            const verRegistro =
                tab.dataset.tab === "registro";

            loginTabs.forEach(function(t) {

                t.classList.toggle("active", t === tab);

            });

            registroForm.classList.toggle(
                "form-oculto",
                !verRegistro
            );

            loginForm.classList.toggle(
                "form-oculto",
                verRegistro
            );
        });
    });


    registroForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const email =
                document.getElementById(
                    "registro-email"
                ).value.trim();

            const password =
                document.getElementById(
                    "registro-password"
                ).value;

            const password2 =
                document.getElementById(
                    "registro-password2"
                ).value;

            const mensaje =
                document.getElementById(
                    "registro-mensaje"
                );

            if (password.length < 6) {

                mensaje.textContent =
                    "La contraseña debe tener al menos 6 caracteres.";

                return;
            }

            if (password !== password2) {

                mensaje.textContent =
                    "Las contraseñas no coinciden.";

                return;
            }

            mensaje.textContent = "Creando cuenta...";

            const { data, error } =
                await supabaseClient.auth.signUp({
                    email: email,
                    password: password
                });

            if (error) {

                console.error(
                    "Error creando cuenta:",
                    error
                );

                mensaje.textContent =
                    /already|registered/i.test(error.message)
                        ? "Ese correo ya está registrado."
                        : "No se pudo crear la cuenta. Intenta de nuevo.";

                return;
            }

            if (
                data.user &&
                data.user.identities &&
                data.user.identities.length === 0
            ) {

                mensaje.textContent =
                    "Ese correo ya está registrado.";

                return;
            }

            // Aún no tiene cargo: no dejamos la sesión abierta
            if (data.session) {

                await supabaseClient.auth.signOut();
            }

            registroForm.reset();

            mensaje.textContent =
                "¡Cuenta creada! Si te llega un correo para confirmarla, " +
                "ábrelo. Después el encargado principal debe asignarte " +
                "un cargo para que puedas entrar.";
        }
    );
}


// Avisos al volver desde el dashboard sin acceso

const avisoLogin =
    new URLSearchParams(window.location.search).get("aviso");

if (avisoLogin && document.getElementById("mensaje")) {

    document.getElementById("mensaje").textContent =
        avisoLogin === "sin-cargo"
            ? "Tu cuenta aún no tiene un cargo asignado. " +
              "Pídele al encargado principal que te lo asigne."
            : "No se pudo verificar tu cargo. Intenta de nuevo.";
}


// ========================================
// PROTEGER DASHBOARD
// ========================================

async function protegerDashboard() {

    const {
        data: { session }
    } = await supabaseClient.auth.getSession();

    if (
        !session &&
        window.location.pathname.includes("dashboard.html")
    ) {

        window.location.href = "index.html";

        return;
    }

    if (
        session &&
        (
            window.location.pathname.endsWith("index.html") ||
            window.location.pathname.endsWith("login-barista.html") ||
            window.location.pathname.endsWith("login-babilonia.html") ||
            window.location.pathname.endsWith("/")
        )
    ) {

        window.location.href = "dashboard.html";

        return;
    }

    if (
        session &&
        window.location.pathname.includes("dashboard.html")
    ) {

        await iniciarPermisos(session.user);
    }
}


// ========================================
// MARCA: LOGO SEGÚN EL BAR
// cocina/barra de Babilonia: siempre Babilonia.
// master/admin: el bar por el que entraron al sistema.
// ========================================

function barActual() {

    if (
        rolUsuario === "cocina_babilonia" ||
        rolUsuario === "barra_babilonia"
    ) {
        return "babilonia";
    }

    if (rolUsuario === "cocina" || rolUsuario === "barra") {
        return "barista";
    }

    try {
        return localStorage.getItem("bar") === "babilonia"
            ? "babilonia"
            : "barista";
    } catch (e) {
        return "barista";
    }
}


function aplicarMarca() {

    const babilonia = barActual() === "babilonia";

    document.body.classList.toggle("bar-babilonia", babilonia);

    if (!babilonia) return;

    document
        .querySelectorAll(
            ".logo-barista, .mobile-logo, .topbar-hero-logo-plano"
        )
        .forEach(function(img) {
            img.src = "imagen/LogoBabilonia.png";
            img.alt = "Babilonia Bar";
        });

    document.title = "Babilonia Bar - Inventario";
}


async function iniciarPermisos(usuario) {

    const cargo = await obtenerCargo(usuario.id);

    if (cargo.error || !cargo.rol) {

        await supabaseClient.auth.signOut();

        window.location.href =
            "login-barista.html?aviso=" +
            (cargo.error ? "error" : "sin-cargo");

        return;
    }

    rolUsuario = cargo.rol;

    aplicarMarca();

    aplicarPermisos();

    document.body.classList.remove("cargando-rol");

    // La carga inicial se hizo antes de saber el cargo: se repite
    if (!esRestringido()) {

        cargarProductos();

        actualizarResumen();
    }
}


function abrirSeccion(nombre) {

    menuItems.forEach(function(item) {

        item.classList.toggle(
            "active",
            item.dataset.section === nombre
        );

    });

    Object.values(sections).forEach(function(section) {

        if (section) {

            section.classList.add("section-hidden");
        }

    });

    if (sections[nombre]) {

        sections[nombre].classList.remove("section-hidden");
    }

    if (nombre === "productos") {

        cargarProductos();
        cargarCategorias();
    }
}


function aplicarPermisos() {

    const etiquetas = {
        master: "Master",
        admin: "Admin",
        cocina: "Cocina",
        barra: "Barra",
        cocina_babilonia: "Cocina Babilonia",
        barra_babilonia: "Barra Babilonia"
    };

    const encargado =
        document.querySelector(".encargado");

    if (encargado) {

        encargado.textContent =
            etiquetas[rolUsuario] || "Encargado";
    }

    const menuUsuarios =
        document.getElementById("menu-usuarios");

    if (menuUsuarios && esMaster()) {

        menuUsuarios.style.display = "";
    }

    if (puedeVerCostos()) {

        const camposCostos =
            document.getElementById("campos-costos");

        if (camposCostos) camposCostos.style.display = "";

        const cardValor =
            document.getElementById("card-valor-inventario");

        if (cardValor) cardValor.style.display = "";

        const cardVenta =
            document.getElementById("card-valor-venta");

        if (cardVenta) cardVenta.style.display = "";
    }

    if (!esRestringido()) return;


    // Cocina y barra: Productos (stock actual), Recetario, Reportes y 86 (botón flotante)

    document.body.classList.add("cargo-restringido");

    menuItems.forEach(function(item) {

        const permitido =
            item.id === "menu-productos" ||
            item.dataset.section === "recetario" ||
            item.dataset.section === "reportes";

        if (!permitido) {

            item.style.display = "none";
        }
    });

    const ocultar = [
        "btn-enviar-reporte",
        "btn-nuevo-producto",
        "detalle-desactivar-btn",
        "detalle-prioridad-btn"
    ];

    ocultar.forEach(function(id) {

        const el = document.getElementById(id);

        if (el) {

            el.style.display = "none";
        }
    });

    const btnDetalleEditar =
        document.getElementById("detalle-editar-btn");

    if (btnDetalleEditar) {

        btnDetalleEditar.textContent = "Actualizar stock";
    }

    abrirSeccion("productos");
}


protegerDashboard();


// ========================================
// CERRAR SESIÓN
// ========================================

if (logoutBtn) {

    logoutBtn.addEventListener("click", async function() {

        const { error } =
            await supabaseClient.auth.signOut();

        if (error) {

            console.error(
                "Error al cerrar sesión:",
                error
            );

            alert("No se pudo cerrar la sesión.");

            return;
        }

        window.location.href = "index.html";
    });
}


// ========================================
// NAVEGACIÓN
// ========================================

const menuItems =
    document.querySelectorAll(".menu-item");

const sections = {

    inicio:
        document.getElementById("section-inicio"),


    usuarios:
        document.getElementById("section-usuarios"),

    productos:
        document.getElementById("section-productos"),

    entradas:
        document.getElementById("section-entradas"),


    facturas:
        document.getElementById("section-facturas"),

    reportes:
        document.getElementById("section-reportes")
};


menuItems.forEach(function(button) {

    button.addEventListener("click", function() {

        const sectionName =
            button.dataset.section;

        // El recetario se abre como ventana flotante sobre la pantalla
        if (sectionName === "recetario") {

            abrirRecetario();

            return;
        }

        menuItems.forEach(function(item) {

            item.classList.remove("active");

        });

        button.classList.add("active");


        Object.values(sections).forEach(function(section) {

            if (section) {

                section.classList.add("section-hidden");

            }

        });


        if (sections[sectionName]) {

            sections[sectionName]
                .classList.remove("section-hidden");

        }


        if (sectionName === "productos") {

            cargarProductos();
            cargarCategorias();

        }




        if (sectionName === "usuarios") {

            cargarUsuarios();

        }


        if (sectionName === "facturas") {

            cargarFacturas();

        }


        if (sectionName === "reportes") {

            cargarReportes();

        }


        if (sectionName === "entradas") {

            cargarEntradas();
            cargarProductosParaEntrada();

        }

    });

});


// ========================================
// PRODUCTOS
// ========================================

const btnNuevoProducto =
    document.getElementById("btn-nuevo-producto");

const modalProducto =
    document.getElementById("modal-producto");

const productoForm =
    document.getElementById("producto-form");


// ========================================
// ABRIR MODAL NUEVO PRODUCTO
// ========================================

if (btnNuevoProducto) {

    btnNuevoProducto.addEventListener(
        "click",
        async function() {

            productoForm.reset();

            document.getElementById(
                "producto-id"
            ).value = "";

            document.querySelector(
                "#modal-producto h2"
            ).textContent = "Nuevo producto";

            document.getElementById(
                "producto-mensaje"
            ).textContent = "";

            modalProducto.classList.remove("hidden");

            await cargarCategorias();

        }
    );
}


// ========================================
// CERRAR MODALES CON data-close
// ========================================

document.querySelectorAll("[data-close]").forEach(function(button) {

    button.addEventListener("click", function() {

        const modalId =
            button.dataset.close;

        const modal =
            document.getElementById(modalId);

        if (modal) {

            modal.classList.add("hidden");

        }

    });

});


// ========================================
// CARGAR CATEGORÍAS
// ========================================

async function cargarCategorias() {

    const select =
        document.getElementById(
            "producto-categoria"
        );

    if (!select) return;


    const { data, error } =
        await supabaseClient
            .from("categorias")
            .select("id, nombre")
            .eq("activo", true)
            .order("nombre");


    if (error) {

        console.error(
            "Error cargando categorías:",
            error
        );

        return;
    }


    select.innerHTML = `
        <option value="">
            Seleccionar categoría
        </option>
    `;


    data.forEach(function(categoria) {

        const option =
            document.createElement("option");

        option.value =
            categoria.id;

        option.textContent =
            categoria.nombre;

        select.appendChild(option);

    });
}


// ========================================
// GUARDAR / ACTUALIZAR PRODUCTO
// ========================================

if (productoForm) {

    productoForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const mensaje =
                document.getElementById(
                    "producto-mensaje"
                );

            const id =
                document.getElementById(
                    "producto-id"
                ).value;

            const nombre =
                document.getElementById(
                    "producto-nombre"
                ).value.trim();

            const categoria =
                document.getElementById(
                    "producto-categoria"
                ).value;

            const unidad =
                document.getElementById(
                    "producto-unidad"
                ).value.trim();

            const stock =
                parseFloat(
                    document.getElementById(
                        "producto-stock"
                    ).value
                ) || 0;

            const minimo =
                parseFloat(
                    document.getElementById(
                        "producto-minimo"
                    ).value
                ) || 0;

            if (esRestringido()) {

                if (!id) {

                    mensaje.textContent =
                        "Tu cargo no puede crear productos.";

                    return;
                }

                mensaje.textContent =
                    "Actualizando stock...";

                const { error: errorStock } =
                    await supabaseClient
                        .from("productos")
                        .update({
                            stock_actual: stock
                        })
                        .eq("id", id);

                if (errorStock) {

                    console.error(
                        "Error actualizando stock:",
                        errorStock
                    );

                    mensaje.textContent =
                        "No se pudo actualizar el stock.";

                    return;
                }

                mensaje.textContent =
                    "¡Stock actualizado!";

                await cargarProductos();

                await actualizarResumen();

                setTimeout(function() {

                    modalProducto
                        .classList
                        .add("hidden");

                }, 700);

                return;
            }


            if (!nombre) {

                mensaje.textContent =
                    "Ingresa el nombre del producto.";

                return;
            }


            if (!unidad) {

                mensaje.textContent =
                    "Ingresa la unidad del producto.";

                return;
            }


            const producto = {

                nombre: nombre,

                categoria_id:
                    categoria
                        ? parseInt(categoria)
                        : null,

                unidad: unidad,

                stock_actual: stock,

                stock_minimo: minimo,

                activo: true
            };


            // ====================================
            // EDITAR PRODUCTO
            // ====================================

            if (id) {

                mensaje.textContent =
                    "Actualizando producto...";


                const { error } =
                    await supabaseClient
                        .from("productos")
                        .update(producto)
                        .eq("id", id);


                if (error) {

                    console.error(
                        "Error actualizando producto:",
                        error
                    );

                    mensaje.textContent =
                        "Error al actualizar el producto.";

                    return;
                }


                if (puedeVerCostos()) {

                    const costosOk = await guardarCostos(id);

                    if (!costosOk) {

                        await cargarProductos();

                        mensaje.textContent =
                            "Producto actualizado, pero no se pudo guardar el costo.";

                        return;
                    }
                }


                mensaje.textContent =
                    "¡Producto actualizado!";


                await cargarProductos();

                await actualizarResumen();


                setTimeout(function() {

                    modalProducto
                        .classList
                        .add("hidden");

                }, 700);


                return;
            }


            // ====================================
            // NUEVO PRODUCTO
            // ====================================

            mensaje.textContent =
                "Guardando producto...";


            const { data, error } =
                await supabaseClient
                    .from("productos")
                    .insert([producto])
                    .select();


            if (error) {

                console.error(
                    "Error guardando producto:",
                    error
                );

                mensaje.textContent =
                    "Error al guardar el producto.";

                return;
            }


            console.log(
                "Producto guardado:",
                data
            );


            if (puedeVerCostos() && data && data[0]) {

                const costosOk =
                    await guardarCostos(data[0].id);

                if (!costosOk) {

                    await cargarProductos();

                    mensaje.textContent =
                        "Producto guardado, pero no se pudo guardar el costo.";

                    return;
                }
            }


            mensaje.textContent =
                "¡Producto guardado correctamente!";


            await cargarProductos();

            await actualizarResumen();


            setTimeout(function() {

                modalProducto
                    .classList
                    .add("hidden");

            }, 700);

        }
    );
}


// ========================================
// CARGAR PRODUCTOS
// ========================================

let versionTablaProductos = 0;


async function cargarProductos() {

    const miVersion = ++versionTablaProductos;

    const tabla =
        document.getElementById(
            "productos-tabla"
        );

    if (!tabla) return;

    cargarPrioridad();


    tabla.innerHTML = `
        <tr>
            <td colspan="9" class="empty">
                Cargando productos...
            </td>
        </tr>
    `;


    const { data, error } =
        await supabaseClient
            .from("productos")
            .select(`
                id,
                nombre,
                unidad,
                stock_actual,
                stock_minimo,
                prioridad,
                activo,
                categoria_id,
                categorias (
                    nombre
                )
            `)
            .eq("activo", true)
            .order("nombre");


    if (error) {

        console.error(
            "Error cargando productos:",
            error
        );


        tabla.innerHTML = `
            <tr>
                <td colspan="9" class="empty">
                    Error al cargar productos.
                </td>
            </tr>
        `;

        return;
    }


    if (!data || data.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="9" class="empty">
                    No hay productos registrados.
                </td>
            </tr>
        `;

        return;
    }


    const costos = await obtenerCostos();

    // Si mientras tanto se pidió otra carga, esta ya quedó vieja
    if (miVersion !== versionTablaProductos) return;


    tabla.innerHTML = "";


    data.forEach(function(producto) {

        let estado = "";
        let claseStock = "";


        if (producto.stock_actual <= 0) {

            estado = "Agotado";
            claseStock = "stock-agotado";

        }
        else if (
            producto.stock_actual <=
            producto.stock_minimo
        ) {

            estado = "Stock bajo";
            claseStock = "stock-bajo";

        }
        else {

            estado = "Normal";
            claseStock = "stock-normal";

        }


        const categoria =
            producto.categorias
                ? producto.categorias.nombre
                : "Sin categoría";


        const fila =
            document.createElement("tr");


        fila.dataset.id = producto.id;


        const costoProducto = costos[producto.id];

        const costoTexto =
            costoProducto
                ? formatoPeso(costoProducto.costo_unitario)
                : (puedeVerCostos() ? "—" : "");

        const ventaTexto =
            costoProducto
                ? formatoPeso(costoProducto.precio_venta)
                : (puedeVerCostos() ? "—" : "");


        const acciones =
            esRestringido()
                ? `
                <button
                    class="btn-action btn-edit"
                    onclick="editarProducto(${producto.id})"
                >
                    Actualizar stock
                </button>
                `
                : `
                <button
                    class="btn-action btn-edit"
                    onclick="editarProducto(${producto.id})"
                >
                    Editar
                </button>

                <button
                    class="btn-action btn-delete"
                    onclick="desactivarProducto(${producto.id})"
                >
                    Desactivar
                </button>

                <button
                    type="button"
                    class="prioridad-circulo${producto.prioridad ? " activo" : ""}"
                    onclick="togglePrioridad(${producto.id}, ${!producto.prioridad})"
                    title="${producto.prioridad ? "Quitar prioridad" : "Marcar como prioridad"}"
                ></button>
                `;


        fila.innerHTML = `

            <td>
                <strong>
                    ${producto.nombre}
                </strong>
            </td>

            <td>
                ${categoria}
            </td>

            <td>
                ${producto.unidad}
            </td>

            <td class="${claseStock}">
                ${producto.stock_actual}
            </td>

            <td>
                ${producto.stock_minimo}
            </td>

            <td class="${claseStock}">
                ${estado}
            </td>

            <td>
                ${costoTexto}
            </td>

            <td>
                ${ventaTexto}
            </td>

            <td>

                ${acciones}

            </td>

        `;


        tabla.appendChild(fila);

    });
}


// ========================================
// CARGAR PRODUCTOS PRIORITARIOS (INICIO)
// ========================================

async function cargarPrioridad() {

    const tabla =
        document.getElementById(
            "prioridad-tabla"
        );

    if (!tabla) return;


    tabla.innerHTML = `
        <tr>
            <td colspan="2" class="empty">
                Cargando productos prioritarios...
            </td>
        </tr>
    `;


    const { data, error } =
        await supabaseClient
            .from("productos")
            .select(`
                id,
                nombre,
                stock_actual,
                stock_minimo
            `)
            .eq("activo", true)
            .eq("prioridad", true)
            .order("nombre");


    if (error) {

        console.error(
            "Error cargando productos prioritarios:",
            error
        );

        tabla.innerHTML = `
            <tr>
                <td colspan="2" class="empty">
                    Error al cargar la prioridad.
                </td>
            </tr>
        `;

        return;
    }


    if (!data || data.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="2" class="empty">
                    No hay productos marcados como prioridad.
                </td>
            </tr>
        `;

        return;
    }


    tabla.innerHTML = "";


    data.forEach(function(producto) {

        let claseStock = "";


        if (producto.stock_actual <= 0) {

            claseStock = "stock-agotado";

        }
        else if (
            producto.stock_actual <=
            producto.stock_minimo
        ) {

            claseStock = "stock-bajo";

        }
        else {

            claseStock = "stock-normal";
        }


        const fila =
            document.createElement("tr");

        fila.innerHTML = `

            <td>
                <strong>
                    ${producto.nombre}
                </strong>
            </td>

            <td class="${claseStock}">
                ${producto.stock_actual}
            </td>

        `;


        tabla.appendChild(fila);
    });
}


// ========================================
// BUSCAR PRODUCTOS
// ========================================

const buscador =
    document.getElementById(
        "buscar-producto"
    );


if (buscador) {

    buscador.addEventListener(
        "input",
        function() {

            const texto =
                buscador.value
                    .toLowerCase()
                    .trim();


            const filas =
                document.querySelectorAll(
                    "#productos-tabla tr"
                );


            filas.forEach(function(fila) {

                const contenido =
                    fila.textContent
                        .toLowerCase();


                fila.style.display =
                    contenido.includes(texto)
                        ? ""
                        : "none";

            });

        }
    );
}


// ========================================
// DESACTIVAR PRODUCTO
// ========================================

async function desactivarProducto(id) {

    const confirmar =
        confirm(
            "¿Seguro que quieres desactivar este producto?"
        );


    if (!confirmar) return;


    const { error } =
        await supabaseClient
            .from("productos")
            .update({
                activo: false
            })
            .eq("id", id);


    if (error) {

        console.error(
            "Error desactivando producto:",
            error
        );

        alert(
            "No se pudo desactivar el producto."
        );

        return;
    }


    await cargarProductos();

    await actualizarResumen();
}


// ========================================
// MARCAR / QUITAR PRIORIDAD
// ========================================

async function togglePrioridad(id, nuevoValor) {

    const { error } =
        await supabaseClient
            .from("productos")
            .update({
                prioridad: nuevoValor
            })
            .eq("id", id);


    if (error) {

        console.error(
            "Error actualizando prioridad:",
            error
        );

        alert(
            "No se pudo actualizar la prioridad."
        );

        return;
    }


    await cargarProductos();
}


// ========================================
// EDITAR PRODUCTO
// ========================================

async function editarProducto(id) {

    await cargarCategorias();


    const { data, error } =
        await supabaseClient
            .from("productos")
            .select("*")
            .eq("id", id)
            .single();


    if (error) {

        console.error(
            "Error obteniendo producto:",
            error
        );

        alert(
            "No se pudo cargar el producto."
        );

        return;
    }


    document.getElementById(
        "producto-id"
    ).value = data.id;


    document.getElementById(
        "producto-nombre"
    ).value = data.nombre;


    document.getElementById(
        "producto-categoria"
    ).value =
        data.categoria_id || "";


    document.getElementById(
        "producto-unidad"
    ).value = data.unidad;


    document.getElementById(
        "producto-stock"
    ).value = data.stock_actual;


    document.getElementById(
        "producto-minimo"
    ).value = data.stock_minimo;


    if (puedeVerCostos()) {

        const { data: costoActual } =
            await supabaseClient
                .from("producto_costos")
                .select("costo_unitario, precio_venta")
                .eq("producto_id", id)
                .maybeSingle();

        document.getElementById("producto-costo").value =
            costoActual ? costoActual.costo_unitario : 0;

        document.getElementById("producto-venta").value =
            costoActual ? costoActual.precio_venta : 0;
    }


    document.querySelector(
        "#modal-producto h2"
    ).textContent =
        "Editar producto";


    document.getElementById(
        "producto-mensaje"
    ).textContent = "";


    const restringido = esRestringido();

    [
        "producto-nombre",
        "producto-categoria",
        "producto-unidad",
        "producto-minimo"
    ].forEach(function(campo) {

        document.getElementById(campo).disabled =
            restringido;

    });

    modalProducto.classList.toggle(
        "solo-stock",
        restringido
    );

    if (restringido) {

        document.querySelector(
            "#modal-producto h2"
        ).textContent = "Actualizar stock: " + data.nombre;
    }


    modalProducto
        .classList
        .remove("hidden");
}


// ========================================
// ENTRADAS (LISTA DE INGRESO)
// Se eligen productos, se arma una lista y al confirmar
// se registra todo junto y se suma al stock.
// ========================================

const ingresoProductoInput =
    document.getElementById("ingreso-producto");
const ingresoCantidadInput =
    document.getElementById("ingreso-cantidad");
const ingresoListaBody =
    document.getElementById("ingreso-lista");
const ingresoMensaje =
    document.getElementById("ingreso-mensaje");

let catalogoIngreso = [];       // productos activos
let listaIngreso = [];          // lo que se va a ingresar
let responsableIngreso = "";    // quién registra

function escaparTexto(valor) {
    return String(valor == null ? "" : valor)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function nombreDesdeCorreo(correo) {
    const local = String(correo || "").split("@")[0];
    if (!local) return "Sin nombre";
    return local.charAt(0).toUpperCase() + local.slice(1);
}

function etiquetaProductoIngreso(producto) {
    return `${producto.nombre} (${producto.unidad || "un"})`;
}

function numeroIngreso(valor) {
    return Number(valor).toLocaleString(
        "es-CL",
        { maximumFractionDigits: 2 }
    );
}

function mostrarMensajeIngreso(texto, esError) {
    if (!ingresoMensaje) return;
    ingresoMensaje.textContent = texto;
    ingresoMensaje.classList.toggle("error", !!esError);
}

async function cargarProductosParaEntrada() {
    const datalist =
        document.getElementById("ingreso-productos-lista");
    if (!datalist) return;

    const [respuestaProductos, respuestaUsuario] =
        await Promise.all([
            supabaseClient
                .from("productos")
                .select("id, nombre, unidad, stock_actual")
                .eq("activo", true)
                .order("nombre"),
            supabaseClient.auth.getUser()
        ]);

    if (respuestaProductos.error) {
        console.error(
            "Error cargando productos para ingreso:",
            respuestaProductos.error
        );
        mostrarMensajeIngreso(
            "No se pudieron cargar los productos.",
            true
        );
        return;
    }

    catalogoIngreso = respuestaProductos.data || [];

    // Si un producto ya está en la lista, refresca su stock mostrado
    listaIngreso.forEach(function(item) {
        const actual = catalogoIngreso.find(function(p) {
            return p.id === item.id;
        });
        if (actual) item.stock = Number(actual.stock_actual || 0);
    });

    datalist.innerHTML = "";
    catalogoIngreso.forEach(function(producto) {
        const option = document.createElement("option");
        option.value = etiquetaProductoIngreso(producto);
        option.label = `Stock: ${producto.stock_actual}`;
        datalist.appendChild(option);
    });

    const usuario =
        respuestaUsuario.data && respuestaUsuario.data.user;
    responsableIngreso =
        usuario ? nombreDesdeCorreo(usuario.email) : "";
    const quien =
        document.getElementById("ingreso-responsable");
    if (quien) {
        quien.textContent = responsableIngreso || "-";
    }

    renderListaIngreso();
}

function buscarProductoIngreso(texto) {
    const buscado = texto.trim().toLowerCase();
    if (!buscado) return null;

    const exacto = catalogoIngreso.find(function(p) {
        return etiquetaProductoIngreso(p).toLowerCase() === buscado;
    });
    if (exacto) return exacto;

    const porNombre = catalogoIngreso.filter(function(p) {
        return p.nombre.trim().toLowerCase() === buscado;
    });
    return porNombre.length === 1 ? porNombre[0] : null;
}

function renderListaIngreso() {
    if (!ingresoListaBody) return;

    const contador =
        document.getElementById("ingreso-contador");
    if (contador) {
        contador.textContent =
            listaIngreso.length === 1
                ? "1 producto"
                : `${listaIngreso.length} productos`;
    }

    if (listaIngreso.length === 0) {
        ingresoListaBody.innerHTML = `
            <tr>
                <td colspan="5" class="empty">
                    Aún no agregas productos a la lista.
                </td>
            </tr>
        `;
        return;
    }

    ingresoListaBody.innerHTML = "";
    listaIngreso.forEach(function(item, indice) {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>
                <strong>${escaparTexto(item.nombre)}</strong>
                <span class="ingreso-unidad">${escaparTexto(item.unidad)}</span>
            </td>
            <td>${numeroIngreso(item.stock)}</td>
            <td>
                <input
                    type="number"
                    class="ingreso-cantidad-fila"
                    min="0.01"
                    step="0.01"
                    value="${item.cantidad}"
                >
            </td>
            <td class="ingreso-stock-nuevo">
                ${numeroIngreso(item.stock + item.cantidad)}
            </td>
            <td>
                <button
                    type="button"
                    class="factura-detalle-quitar"
                    aria-label="Quitar de la lista"
                >&times;</button>
            </td>
        `;

        const inputCantidad =
            fila.querySelector(".ingreso-cantidad-fila");
        inputCantidad.addEventListener("input", function() {
            const valor = parseFloat(inputCantidad.value);
            item.cantidad = valor > 0 ? valor : 0;
            fila.querySelector(".ingreso-stock-nuevo")
                .textContent =
                    numeroIngreso(item.stock + item.cantidad);
        });

        fila.querySelector("button").addEventListener(
            "click",
            function() {
                listaIngreso.splice(indice, 1);
                renderListaIngreso();
            }
        );

        ingresoListaBody.appendChild(fila);
    });
}

function agregarAListaIngreso() {
    mostrarMensajeIngreso("");

    const producto =
        buscarProductoIngreso(ingresoProductoInput.value);
    const cantidad =
        parseFloat(ingresoCantidadInput.value);

    if (!producto) {
        mostrarMensajeIngreso(
            "Elige un producto de la lista de sugerencias.",
            true
        );
        return;
    }
    if (!cantidad || cantidad <= 0) {
        mostrarMensajeIngreso(
            "Ingresa una cantidad válida.",
            true
        );
        return;
    }

    const existente = listaIngreso.find(function(item) {
        return item.id === producto.id;
    });
    if (existente) {
        existente.cantidad += cantidad;
    } else {
        listaIngreso.push({
            id: producto.id,
            nombre: producto.nombre,
            unidad: producto.unidad || "un",
            stock: Number(producto.stock_actual || 0),
            cantidad: cantidad
        });
    }

    ingresoProductoInput.value = "";
    ingresoCantidadInput.value = "";
    ingresoProductoInput.focus();
    renderListaIngreso();
}

const ingresoAgregarBtn =
    document.getElementById("ingreso-agregar-btn");
if (ingresoAgregarBtn) {
    ingresoAgregarBtn.addEventListener(
        "click",
        agregarAListaIngreso
    );
    [ingresoProductoInput, ingresoCantidadInput].forEach(
        function(campo) {
            campo.addEventListener("keydown", function(e) {
                if (e.key === "Enter") {
                    e.preventDefault();
                    agregarAListaIngreso();
                }
            });
        }
    );
}

const ingresoVaciarBtn =
    document.getElementById("ingreso-vaciar-btn");
if (ingresoVaciarBtn) {
    ingresoVaciarBtn.addEventListener("click", function() {
        listaIngreso = [];
        mostrarMensajeIngreso("");
        renderListaIngreso();
    });
}

const ingresoConfirmarBtn =
    document.getElementById("ingreso-confirmar-btn");
if (ingresoConfirmarBtn) {
    ingresoConfirmarBtn.addEventListener(
        "click",
        async function() {
            const items = listaIngreso.filter(function(item) {
                return item.cantidad > 0;
            });

            if (items.length === 0) {
                mostrarMensajeIngreso(
                    "Agrega al menos un producto con cantidad.",
                    true
                );
                return;
            }
            if (items.length !== listaIngreso.length) {
                mostrarMensajeIngreso(
                    "Hay productos con cantidad 0. Corrígelos o quítalos.",
                    true
                );
                return;
            }

            ingresoConfirmarBtn.disabled = true;
            mostrarMensajeIngreso("Registrando ingreso...");

            const { error } =
                await supabaseClient.rpc("registrar_ingreso", {
                    p_items: items.map(function(item) {
                        return {
                            producto_id: item.id,
                            cantidad: item.cantidad
                        };
                    }),
                    p_proveedor: null,
                    p_documento: null,
                    p_observacion:
                        document.getElementById("ingreso-observacion")
                            .value.trim() || null
                });

            ingresoConfirmarBtn.disabled = false;

            if (error) {
                console.error("Error registrando ingreso:", error);
                const falta =
                    error.code === "PGRST202" ||
                    /registrar_ingreso/.test(error.message || "");
                mostrarMensajeIngreso(
                    falta
                        ? "Falta ejecutar entradas_ingresos.sql en Supabase."
                        : "No se pudo registrar el ingreso: " +
                          (error.message || "error desconocido"),
                    true
                );
                return;
            }

            const cantidadProductos = items.length;
            listaIngreso = [];
            ["ingreso-observacion"]
                .forEach(function(id) {
                    document.getElementById(id).value = "";
                });
            renderListaIngreso();
            mostrarMensajeIngreso(
                cantidadProductos === 1
                    ? "¡Ingreso registrado! Se actualizó el stock de 1 producto."
                    : `¡Ingreso registrado! Se actualizó el stock de ${cantidadProductos} productos.`
            );

            await Promise.all([
                cargarEntradas(),
                cargarProductosParaEntrada(),
                cargarProductos(),
                actualizarResumen()
            ]);
        }
    );
}

// ========================================
// HISTORIAL DE INGRESOS
// ========================================
async function cargarEntradas() {
    const tabla =
        document.getElementById("entradas-tabla");
    if (!tabla) return;

    tabla.innerHTML = `
        <tr>
            <td colspan="4" class="empty">
                Cargando ingresos...
            </td>
        </tr>
    `;

    const columnas = `
        id,
        cantidad,
        proveedor,
        documento,
        observacion,
        created_at,
        productos (
            nombre,
            unidad
        )
    `;

    let { data, error } =
        await supabaseClient
            .from("entradas")
            .select(columnas + ", ingreso_id, registrado_por")
            .order("created_at", { ascending: false })
            .limit(500);

    if (error) {
        // Si todavía no se ejecutó el SQL nuevo, muestra lo antiguo
        const respaldo =
            await supabaseClient
                .from("entradas")
                .select(columnas)
                .order("created_at", { ascending: false })
                .limit(500);
        data = respaldo.data;
        error = respaldo.error;
    }

    if (error) {
        console.error("Error cargando entradas:", error);
        tabla.innerHTML = `
            <tr>
                <td colspan="4" class="empty">
                    Error al cargar los ingresos.
                </td>
            </tr>
        `;
        return;
    }

    if (!data || data.length === 0) {
        tabla.innerHTML = `
            <tr>
                <td colspan="4" class="empty">
                    No hay ingresos registrados.
                </td>
            </tr>
        `;
        return;
    }

    // Agrupa las filas que pertenecen al mismo ingreso
    const grupos = [];
    const indice = {};
    data.forEach(function(entrada) {
        const clave = entrada.ingreso_id
            ? "g" + entrada.ingreso_id
            : "e" + entrada.id;
        if (!indice[clave]) {
            indice[clave] = {
                fecha: entrada.created_at,
                quien: entrada.registrado_por,
                proveedor: entrada.proveedor,
                documento: entrada.documento,
                observacion: entrada.observacion,
                items: []
            };
            grupos.push(indice[clave]);
        }
        indice[clave].items.push(entrada);
    });

    tabla.innerHTML = "";
    grupos.forEach(function(grupo) {
        const fecha = new Date(grupo.fecha).toLocaleString(
            "es-CL",
            { dateStyle: "short", timeStyle: "short" }
        );

        const productos = grupo.items.map(function(entrada) {
            const nombre = entrada.productos
                ? entrada.productos.nombre
                : "Producto eliminado";
            const unidad = entrada.productos
                ? entrada.productos.unidad || ""
                : "";
            return `
                <li>
                    <strong>${escaparTexto(nombre)}</strong>
                    <span class="ingreso-hist-cant">
                        +${numeroIngreso(entrada.cantidad)} ${escaparTexto(unidad)}
                    </span>
                </li>
            `;
        }).join("");


        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${fecha}</td>
            <td>${grupo.quien ? escaparTexto(nombreDesdeCorreo(grupo.quien)) : "-"}</td>
            <td><ul class="ingreso-hist-lista">${productos}</ul></td>
            <td>${escaparTexto(grupo.observacion) || "-"}</td>
        `;
        tabla.appendChild(fila);
    });
}

// ========================================
// RESUMEN DEL INICIO
// ========================================

// Aviso de "productos por reponer" en el Inicio
function actualizarBannerAtencion(stockBajo, agotados) {

    const banner = document.getElementById("banner-atencion");

    if (!banner) return;

    if (stockBajo === 0 || esRestringido()) {

        banner.hidden = true;

        return;
    }

    const bajoSolo = stockBajo - agotados;

    document.getElementById("banner-titulo").textContent =
        stockBajo === 1
            ? "1 producto por reponer"
            : stockBajo + " productos por reponer";

    const partes = [];

    if (agotados > 0) {
        partes.push(
            agotados === 1
                ? "1 agotado"
                : agotados + " agotados"
        );
    }

    if (bajoSolo > 0) {
        partes.push(bajoSolo + " bajo el mínimo");
    }

    document.getElementById("banner-detalle").textContent =
        partes.join(" · ");

    banner.hidden = false;
}


async function actualizarResumen() {

    const totalProductos =
        document.getElementById(
            "total-productos"
        );

    const totalEntradas =
        document.getElementById(
            "total-entradas"
        );

    const totalStockBajo =
        document.getElementById(
            "total-stock-bajo"
        );


    if (
        !totalProductos &&
        !totalEntradas &&
        !totalStockBajo
    ) {

        return;
    }


    const { data: productos, error: errorProductos } =
        await supabaseClient
            .from("productos")
            .select(
                "id, stock_actual, stock_minimo"
            )
            .eq("activo", true);


    if (!errorProductos && productos) {

        if (totalProductos) {

            totalProductos.textContent =
                productos.length;

        }


        const stockBajo =
            productos.filter(function(producto) {

                return Number(producto.stock_actual) <=
                    Number(producto.stock_minimo);

            }).length;


        if (totalStockBajo) {

            totalStockBajo.textContent =
                stockBajo;

        }


        const agotados =
            productos.filter(function(producto) {

                return Number(producto.stock_actual) <= 0;

            }).length;

        actualizarBannerAtencion(
            stockBajo,
            agotados
        );

    }


    const valorInventario =
        document.getElementById("valor-inventario");

    const valorVenta =
        document.getElementById("valor-venta");

    if (
        (valorInventario || valorVenta) &&
        puedeVerCostos() &&
        !errorProductos &&
        productos
    ) {

        const costos = await obtenerCostos();

        let totalCosto = 0;
        let totalVenta = 0;

        productos.forEach(function(producto) {

            const c = costos[producto.id];

            if (c) {

                const stock = Number(producto.stock_actual);

                totalCosto += stock * Number(c.costo_unitario);
                totalVenta += stock * Number(c.precio_venta);
            }
        });

        if (valorInventario) {
            valorInventario.textContent =
                formatoPeso(Math.round(totalCosto));
        }

        if (valorVenta) {
            valorVenta.textContent =
                formatoPeso(Math.round(totalVenta));
        }
    }


    const { count, error: errorEntradas } =
        await supabaseClient
            .from("entradas")
            .select(
                "id",
                {
                    count: "exact",
                    head: true
                }
            );


    if (!errorEntradas && totalEntradas) {

        totalEntradas.textContent =
            count || 0;

    }
}


// ========================================
// CARGAR DATOS INICIALES
// ========================================

if (
    window.location.pathname.includes(
        "dashboard.html"
    )
) {

    cargarProductos();

    actualizarResumen();

}
// ========================================
// TARJETA STOCK BAJO
// ========================================

const cardStockBajo =
    document.getElementById("card-stock-bajo");

if (cardStockBajo) {

    cardStockBajo.addEventListener(
        "click",
        async function() {

            // Ir a Productos
            const botonProductos =
                document.querySelector(
                    '.menu-item[data-section="productos"]'
                );

            if (botonProductos) {
                botonProductos.click();
            }

            // Esperar a que carguen los productos
            await cargarProductos();

            // Mostrar solamente stock bajo
            const filas =
                document.querySelectorAll(
                    "#productos-tabla tr"
                );

            filas.forEach(function(fila) {

                const stockElement =
                    fila.querySelector(
                        "td:nth-child(4)"
                    );

                const minimoElement =
                    fila.querySelector(
                        "td:nth-child(5)"
                    );

                if (
                    !stockElement ||
                    !minimoElement
                ) {
                    return;
                }

                const stock =
                    parseFloat(
                        stockElement.textContent
                    ) || 0;

                const minimo =
                    parseFloat(
                        minimoElement.textContent
                    ) || 0;

                if (stock <= minimo) {

                    fila.style.display = "";

                } else {

                    fila.style.display = "none";

                }

            });

        }
    );
}

// ========================================
// FACTURAS
// ========================================

const btnNuevaFactura =
    document.getElementById("btn-nueva-factura");

const modalFactura =
    document.getElementById("modal-factura");

const facturaForm =
    document.getElementById("factura-form");

const facturaDetalleLista =
    document.getElementById("factura-detalle-lista");

const modalVerFactura =
    document.getElementById("modal-ver-factura");


let productosParaFactura = [];


// Trae los productos activos (una vez) para llenar
// los selects del detalle de la factura

async function obtenerProductosParaFactura() {

    const { data, error } =
        await supabaseClient
            .from("productos")
            .select("id, nombre, costo_unitario")
            .eq("activo", true)
            .order("nombre");

    if (error) {

        console.error(
            "Error cargando productos para factura:",
            error
        );

        productosParaFactura = [];
        return;
    }

    productosParaFactura = data || [];
}


// Crea una fila de detalle (producto / cantidad / valor)

function crearFilaDetalleFactura() {

    const fila =
        document.createElement("div");

    fila.className = "factura-detalle-row";


    let opciones = `
        <option value="">
            Seleccionar producto
        </option>
    `;

    productosParaFactura.forEach(function(producto) {

        opciones += `
            <option
                value="${producto.id}"
                data-costo="${producto.costo_unitario || 0}"
            >
                ${producto.nombre}
            </option>
        `;

    });


    fila.innerHTML = `

        <select class="factura-detalle-producto">
            ${opciones}
        </select>

        <input
            type="number"
            class="factura-detalle-cantidad"
            min="0.01"
            step="0.01"
            placeholder="Cant."
        >

        <input
            type="number"
            class="factura-detalle-valor"
            min="0"
            step="1"
            placeholder="Valor unit."
        >

        <span class="factura-detalle-subtotal">
            $0
        </span>

        <button
            type="button"
            class="factura-detalle-quitar"
        >
            ×
        </button>

    `;


    const select =
        fila.querySelector(
            ".factura-detalle-producto"
        );

    const inputCantidad =
        fila.querySelector(
            ".factura-detalle-cantidad"
        );

    const inputValor =
        fila.querySelector(
            ".factura-detalle-valor"
        );


    // Al elegir un producto, sugiere su costo como valor unitario

    select.addEventListener("change", function() {

        const opcionElegida =
            select.selectedOptions[0];

        const costo =
            opcionElegida
                ? opcionElegida.dataset.costo
                : "";

        if (costo && !inputValor.value) {

            inputValor.value = costo;
        }

        recalcularTotalFactura();
    });


    inputCantidad.addEventListener(
        "input", recalcularTotalFactura
    );

    inputValor.addEventListener(
        "input", recalcularTotalFactura
    );


    fila.querySelector(
        ".factura-detalle-quitar"
    ).addEventListener("click", function() {

        fila.remove();
        recalcularTotalFactura();
    });


    return fila;
}


function recalcularTotalFactura() {

    let total = 0;

    const filas =
        facturaDetalleLista.querySelectorAll(
            ".factura-detalle-row"
        );

    filas.forEach(function(fila) {

        const cantidad =
            parseFloat(
                fila.querySelector(
                    ".factura-detalle-cantidad"
                ).value
            ) || 0;

        const valor =
            parseFloat(
                fila.querySelector(
                    ".factura-detalle-valor"
                ).value
            ) || 0;

        const subtotal =
            cantidad * valor;

        fila.querySelector(
            ".factura-detalle-subtotal"
        ).textContent =
            "$" + subtotal.toLocaleString("es-CL");

        total += subtotal;
    });


    const totalElement =
        document.getElementById("factura-total");

    if (totalElement) {

        totalElement.textContent =
            "$" + total.toLocaleString("es-CL");
    }

    return total;
}


if (btnNuevaFactura) {

    btnNuevaFactura.addEventListener(
        "click",
        async function() {

            facturaForm.reset();

            document.getElementById(
                "factura-mensaje"
            ).textContent = "";

            facturaDetalleLista.innerHTML = "";

            await obtenerProductosParaFactura();

            facturaDetalleLista.appendChild(
                crearFilaDetalleFactura()
            );

            recalcularTotalFactura();

            modalFactura.classList.remove("hidden");
        }
    );
}


if (document.getElementById("btn-agregar-detalle-factura")) {

    document.getElementById(
        "btn-agregar-detalle-factura"
    ).addEventListener("click", function() {

        facturaDetalleLista.appendChild(
            crearFilaDetalleFactura()
        );
    });
}


if (facturaForm) {

    facturaForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const mensaje =
                document.getElementById(
                    "factura-mensaje"
                );

            mensaje.textContent =
                "Guardando factura...";


            const nombre =
                document.getElementById(
                    "factura-nombre"
                ).value.trim();

            const rut =
                document.getElementById(
                    "factura-rut"
                ).value.trim();

            const giro =
                document.getElementById(
                    "factura-giro"
                ).value.trim();

            const tipoGiro =
                document.getElementById(
                    "factura-tipo-giro"
                ).value.trim();

            const direccion =
                document.getElementById(
                    "factura-direccion"
                ).value.trim();

            const comuna =
                document.getElementById(
                    "factura-comuna"
                ).value.trim();

            const ciudad =
                document.getElementById(
                    "factura-ciudad"
                ).value.trim();

            const contacto =
                document.getElementById(
                    "factura-contacto"
                ).value.trim();


            if (!nombre || !rut) {

                mensaje.textContent =
                    "Completa nombre y RUT.";

                return;
            }


            const filas =
                Array.from(
                    facturaDetalleLista.querySelectorAll(
                        ".factura-detalle-row"
                    )
                );

            const items = [];

            for (const fila of filas) {

                const productoId =
                    fila.querySelector(
                        ".factura-detalle-producto"
                    ).value;

                const cantidad =
                    parseFloat(
                        fila.querySelector(
                            ".factura-detalle-cantidad"
                        ).value
                    );

                const valor =
                    parseFloat(
                        fila.querySelector(
                            ".factura-detalle-valor"
                        ).value
                    );

                const nombreProducto =
                    fila.querySelector(
                        ".factura-detalle-producto"
                    ).selectedOptions[0]
                        ? fila.querySelector(
                            ".factura-detalle-producto"
                        ).selectedOptions[0].textContent.trim()
                        : "";

                if (
                    productoId &&
                    cantidad > 0 &&
                    valor >= 0
                ) {

                    items.push({
                        producto_id: parseInt(productoId),
                        producto_nombre: nombreProducto,
                        cantidad: cantidad,
                        valor_unitario: valor
                    });
                }
            }


            if (items.length === 0) {

                mensaje.textContent =
                    "Agrega al menos un producto con cantidad y valor.";

                return;
            }


            const total =
                recalcularTotalFactura();


            const { data: facturaCreada, error: errorFactura } =
                await supabaseClient
                    .from("facturas")
                    .insert([{
                        nombre: nombre,
                        rut: rut,
                        giro: giro || null,
                        tipo_giro: tipoGiro || null,
                        direccion: direccion || null,
                        comuna: comuna || null,
                        ciudad: ciudad || null,
                        contacto: contacto || null,
                        total: total
                    }])
                    .select()
                    .single();


            if (errorFactura) {

                console.error(
                    "Error guardando factura:",
                    errorFactura
                );

                mensaje.textContent =
                    "Error al guardar la factura.";

                return;
            }


            const detalleAInsertar =
                items.map(function(item) {

                    return {
                        factura_id: facturaCreada.id,
                        producto_id: item.producto_id,
                        producto_nombre: item.producto_nombre,
                        cantidad: item.cantidad,
                        valor_unitario: item.valor_unitario
                    };
                });


            const { error: errorDetalle } =
                await supabaseClient
                    .from("factura_detalle")
                    .insert(detalleAInsertar);


            if (errorDetalle) {

                console.error(
                    "Error guardando el detalle de la factura:",
                    errorDetalle
                );

                mensaje.textContent =
                    "La factura se guardó, pero hubo un error con el detalle.";

                return;
            }


            mensaje.textContent =
                "¡Factura guardada correctamente!";

            await cargarFacturas();

            setTimeout(function() {

                modalFactura.classList.add("hidden");

            }, 900);
        }
    );
}


// ========================================
// LISTAR FACTURAS
// ========================================

async function cargarFacturas() {

    const tabla =
        document.getElementById("facturas-tabla");

    if (!tabla) return;

    tabla.innerHTML = `
        <tr>
            <td colspan="5" class="empty">
                Cargando facturas...
            </td>
        </tr>
    `;


    const { data, error } =
        await supabaseClient
            .from("facturas")
            .select("*")
            .order("creado_en", { ascending: false });


    if (error) {

        console.error(
            "Error cargando facturas:",
            error
        );

        tabla.innerHTML = `
            <tr>
                <td colspan="5" class="empty">
                    Error al cargar facturas.
                </td>
            </tr>
        `;

        return;
    }


    if (!data || data.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="5" class="empty">
                    No hay facturas registradas.
                </td>
            </tr>
        `;

        return;
    }


    tabla.innerHTML = "";

    data.forEach(function(factura) {

        const fila =
            document.createElement("tr");

        const fecha =
            new Date(factura.creado_en)
                .toLocaleDateString("es-CL");

        fila.innerHTML = `

            <td>${fecha}</td>

            <td><strong>${factura.nombre}</strong></td>

            <td>${factura.rut}</td>

            <td>$${Number(factura.total || 0).toLocaleString("es-CL")}</td>

            <td>

                <button
                    class="btn-action btn-edit"
                    onclick="verFactura(${factura.id})"
                >
                    Ver
                </button>

                <button
                    class="btn-action btn-delete"
                    onclick="eliminarFactura(${factura.id})"
                >
                    Eliminar
                </button>

            </td>

        `;

        tabla.appendChild(fila);
    });
}


async function verFactura(id) {

    const { data: factura, error: errorFactura } =
        await supabaseClient
            .from("facturas")
            .select("*")
            .eq("id", id)
            .single();

    if (errorFactura) {

        console.error(
            "Error obteniendo factura:",
            errorFactura
        );

        alert("No se pudo cargar la factura.");
        return;
    }


    const { data: detalle, error: errorDetalle } =
        await supabaseClient
            .from("factura_detalle")
            .select("*")
            .eq("factura_id", id);

    if (errorDetalle) {

        console.error(
            "Error obteniendo el detalle:",
            errorDetalle
        );
    }


    document.getElementById(
        "ver-factura-nombre"
    ).textContent = factura.nombre;

    document.getElementById(
        "ver-factura-rut"
    ).textContent = "RUT: " + factura.rut;

    document.getElementById(
        "ver-factura-giro"
    ).textContent = factura.giro || "-";

    document.getElementById(
        "ver-factura-tipo-giro"
    ).textContent = factura.tipo_giro || "-";

    document.getElementById(
        "ver-factura-direccion"
    ).textContent = factura.direccion || "-";

    document.getElementById(
        "ver-factura-comuna"
    ).textContent = factura.comuna || "-";

    document.getElementById(
        "ver-factura-ciudad"
    ).textContent = factura.ciudad || "-";

    document.getElementById(
        "ver-factura-contacto"
    ).textContent = factura.contacto || "-";


    const contenedorProductos =
        document.getElementById(
            "ver-factura-productos"
        );

    contenedorProductos.innerHTML = "";

    (detalle || []).forEach(function(item) {

        const fila =
            document.createElement("div");

        fila.className = "detalle-row";

        fila.innerHTML = `
            <span>
                ${item.producto_nombre || "Producto"}
                (x${item.cantidad})
            </span>
            <strong>
                $${Number(item.subtotal || (item.cantidad * item.valor_unitario)).toLocaleString("es-CL")}
            </strong>
        `;

        contenedorProductos.appendChild(fila);
    });


    document.getElementById(
        "ver-factura-total"
    ).textContent =
        "$" + Number(factura.total || 0).toLocaleString("es-CL");


    modalVerFactura.classList.remove("hidden");
}


async function eliminarFactura(id) {

    const confirmar =
        confirm(
            "¿Seguro que quieres eliminar esta factura? Esta acción no se puede deshacer."
        );

    if (!confirmar) return;

    const { error } =
        await supabaseClient
            .from("facturas")
            .delete()
            .eq("id", id);

    if (error) {

        console.error(
            "Error eliminando factura:",
            error
        );

        alert("No se pudo eliminar la factura.");
        return;
    }

    await cargarFacturas();
}


// ========================================
// REPORTES
// ========================================

let reporteActual = [];


function calcularEstadoProducto(producto) {

    if (producto.stock_actual <= 0) {

        return { estado: "Agotado", clase: "stock-agotado" };
    }

    if (producto.stock_actual <= producto.stock_minimo) {

        return { estado: "Stock bajo", clase: "stock-bajo" };
    }

    return { estado: "Normal", clase: "stock-normal" };
}


async function cargarReportes() {

    const tabla =
        document.getElementById("reportes-tabla");

    if (!tabla) return;

    tabla.innerHTML = `
        <tr>
            <td colspan="5" class="empty">
                Cargando reporte...
            </td>
        </tr>
    `;


    const { data, error } =
        await supabaseClient
            .from("productos")
            .select("id, nombre, stock_actual, stock_minimo")
            .eq("activo", true)
            .order("nombre");

    if (error) {

        console.error(
            "Error cargando el reporte:",
            error
        );

        tabla.innerHTML = `
            <tr>
                <td colspan="5" class="empty">
                    Error al cargar el reporte.
                </td>
            </tr>
        `;

        reporteActual = [];
        return;
    }


    if (!data || data.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="5" class="empty">
                    No hay productos para mostrar.
                </td>
            </tr>
        `;

        reporteActual = [];
        return;
    }


    const costos = await obtenerCostos();


    reporteActual =
        data.map(function(producto) {

            const { estado } =
                calcularEstadoProducto(producto);

            const c = costos[producto.id];

            const costoUnit = c ? Number(c.costo_unitario) : 0;

            return {
                producto: producto.nombre,
                cantidad: producto.stock_actual,
                estado: estado,
                costo: costoUnit,
                valor: Number(producto.stock_actual) * costoUnit
            };
        });


    tabla.innerHTML = "";

    data.forEach(function(producto, indice) {

        const item = reporteActual[indice];

        const { estado, clase } =
            calcularEstadoProducto(producto);

        const fila =
            document.createElement("tr");

        fila.innerHTML = `

            <td><strong>${producto.nombre}</strong></td>

            <td>${producto.stock_actual}</td>

            <td class="${clase}">${estado}</td>

            <td>${formatoPeso(item.costo)}</td>

            <td>${formatoPeso(item.valor)}</td>

        `;

        tabla.appendChild(fila);
    });
}


// ========================================
// EXPORTAR REPORTE A EXCEL
// ========================================

const btnExportarExcel =
    document.getElementById("btn-exportar-excel");

if (btnExportarExcel) {

    btnExportarExcel.addEventListener("click", function() {

        if (!window.XLSX) {

            alert(
                "No se pudo cargar la librería de Excel. Revisa tu conexión."
            );

            return;
        }

        if (reporteActual.length === 0) {

            alert("No hay datos para exportar todavía.");
            return;
        }


        const filas =
            reporteActual.map(function(item) {

                const fila = {
                    Producto: item.producto,
                    Cantidad: item.cantidad,
                    Estado: item.estado
                };

                // Los costos solo los ven master y admin
                if (puedeVerCostos()) {
                    fila["Costo unitario"] = item.costo;
                    fila["Valor total"] = item.valor;
                }

                return fila;
            });

        const hoja =
            XLSX.utils.json_to_sheet(filas);

        const libro =
            XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            libro, hoja, "Inventario"
        );

        const fechaArchivo =
            new Date()
                .toISOString()
                .slice(0, 10);

        XLSX.writeFile(
            libro,
            `reporte-inventario-${fechaArchivo}.xlsx`
        );
    });
}


// ========================================
// ENVIAR REPORTE POR CORREO
// ========================================

const btnEnviarReporte =
    document.getElementById("btn-enviar-reporte");

const modalEnviarReporte =
    document.getElementById("modal-enviar-reporte");

const enviarReporteForm =
    document.getElementById("enviar-reporte-form");


async function cargarCorreosGuardados() {

    const datalist =
        document.getElementById(
            "reportes-correos-guardados"
        );

    if (!datalist) return;

    const { data, error } =
        await supabaseClient
            .from("correos_reportes")
            .select("email")
            .order("usado_en", { ascending: false });

    if (error) {

        console.error(
            "Error cargando correos guardados:",
            error
        );

        return;
    }

    datalist.innerHTML = "";

    (data || []).forEach(function(fila) {

        const opcion =
            document.createElement("option");

        opcion.value = fila.email;

        datalist.appendChild(opcion);
    });
}


async function guardarCorreoUsado(email) {

    const { error } =
        await supabaseClient
            .from("correos_reportes")
            .upsert(
                { email: email, usado_en: new Date().toISOString() },
                { onConflict: "email" }
            );

    if (error) {

        console.error(
            "Error guardando el correo:",
            error
        );
    }
}


function construirTablaHtmlReporte() {

    const estilo = "padding:4px 8px;border:1px solid #ddd;";

    // Solo se envían por correo los productos que requieren atención
    // (Stock bajo / Agotado); el inventario completo ya se ve en el panel.
    const items =
        reporteActual.filter(function(item) {
            return item.estado !== "Normal";
        });

    if (items.length === 0) {

        return (
            "<p style=\"font-family:sans-serif;font-size:14px;\">" +
            "No hay productos con stock bajo o agotado por el momento." +
            "</p>"
        );
    }

    let filasHtml = "";

    items.forEach(function(item) {

        filasHtml +=
            "<tr>" +
            "<td style=\"" + estilo + "\">" + item.producto + "</td>" +
            "<td style=\"" + estilo + "\">" + item.cantidad + "</td>" +
            "<td style=\"" + estilo + "\">" + item.estado + "</td>" +
            "</tr>";
    });

    return (
        "<table style=\"border-collapse:collapse;font-family:sans-serif;font-size:13px;\">" +
        "<thead><tr>" +
        "<th style=\"" + estilo + "text-align:left;\">Producto</th>" +
        "<th style=\"" + estilo + "text-align:left;\">Cantidad</th>" +
        "<th style=\"" + estilo + "text-align:left;\">Estado</th>" +
        "</tr></thead>" +
        "<tbody>" + filasHtml + "</tbody>" +
        "</table>"
    );
}


if (btnEnviarReporte) {

    btnEnviarReporte.addEventListener(
        "click",
        async function() {

            if (reporteActual.length === 0) {

                alert("No hay datos para enviar todavía.");
                return;
            }

            document.getElementById(
                "reporte-mensaje"
            ).textContent = "";

            enviarReporteForm.reset();

            await cargarCorreosGuardados();

            modalEnviarReporte.classList.remove("hidden");
        }
    );
}


if (enviarReporteForm) {

    enviarReporteForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const mensaje =
                document.getElementById(
                    "reporte-mensaje"
                );

            const email =
                document.getElementById(
                    "reporte-email"
                ).value.trim();

            if (!email) return;

            if (!window.emailjs) {

                mensaje.textContent =
                    "No se pudo cargar EmailJS.";

                return;
            }

            if (
                EMAILJS_SERVICE_ID.indexOf("PEGA_AQUI") === 0 ||
                EMAILJS_TEMPLATE_ID.indexOf("PEGA_AQUI") === 0
            ) {

                mensaje.textContent =
                    "Falta configurar EmailJS (Service ID / Template ID) en app.js.";

                return;
            }

            mensaje.textContent =
                "Enviando...";


            try {

                await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    {
                        to_email: email,
                        mensaje_html: construirTablaHtmlReporte(),
                        fecha: new Date().toLocaleDateString("es-CL")
                    }
                );

                await guardarCorreoUsado(email);

                mensaje.textContent =
                    "¡Reporte enviado correctamente!";

                setTimeout(function() {

                    modalEnviarReporte.classList.add("hidden");

                }, 900);

            } catch (err) {

                console.error(
                    "Error enviando el reporte:",
                    err
                );

                const detalle =
                    (err && (err.text || err.message)) ||
                    "sin detalle";

                mensaje.textContent =
                    "Error al enviar el correo (" +
                    detalle +
                    ").";
            }
        }
    );
}


// ========================================
// 86 (LO QUE FALTA O SE ACABA)
// ========================================

const form86 =
    document.getElementById("form-86");

const input86 =
    document.getElementById("input-86");

const lista86 =
    document.getElementById("lista-86");

const mensaje86 =
    document.getElementById("mensaje-86");

const badge86 =
    document.getElementById("badge-86");


function actualizarBadge86(cantidad) {

    if (!badge86) return;

    badge86.textContent = cantidad;

    badge86.classList.toggle(
        "hidden",
        cantidad === 0
    );
}


async function cargar86() {

    if (!lista86) return;

    const { data, error } =
        await supabaseClient
            .from("ochenta_y_seis")
            .select("id, nombre, created_at")
            .order("created_at", { ascending: false });


    if (error) {

        console.error(
            "Error cargando 86:",
            error
        );

        if (mensaje86) {

            mensaje86.textContent =
                "No se pudo cargar la pizarra. " +
                "¿Está creada la tabla ochenta_y_seis en Supabase?";
        }

        return;
    }


    if (mensaje86) mensaje86.textContent = "";

    lista86.innerHTML = "";

    actualizarBadge86(data.length);


    if (data.length === 0) {

        const vacio = document.createElement("p");

        vacio.className = "pizarra-vacio";

        vacio.textContent =
            "No hay nada en 86 por ahora.";

        lista86.appendChild(vacio);

        return;
    }


    data.forEach(function(item) {

        const tarjeta = document.createElement("div");

        tarjeta.className = "pizarra-item";

        const texto = document.createElement("div");

        const nombre = document.createElement("span");

        nombre.className = "pizarra-item-nombre";

        nombre.textContent = item.nombre;

        const hora = document.createElement("span");

        hora.className = "pizarra-item-hora";

        hora.textContent =
            new Date(item.created_at).toLocaleString(
                "es-CL",
                {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );

        texto.appendChild(nombre);
        texto.appendChild(hora);

        const borrar = document.createElement("button");

        borrar.type = "button";

        borrar.className = "pizarra-borrar";

        borrar.setAttribute("aria-label", "Borrar");

        borrar.innerHTML = "&times;";

        borrar.addEventListener("click", function() {

            borrar86(item.id);
        });

        tarjeta.appendChild(texto);
        tarjeta.appendChild(borrar);

        lista86.appendChild(tarjeta);
    });
}


async function borrar86(id) {

    const { error } =
        await supabaseClient
            .from("ochenta_y_seis")
            .delete()
            .eq("id", id);


    if (error) {

        console.error(
            "Error borrando 86:",
            error
        );

        alert("No se pudo borrar el 86.");

        return;
    }


    await cargar86();
}


if (form86) {

    form86.addEventListener(
        "submit",
        async function(e) {

            e.preventDefault();

            const nombre = input86.value.trim();

            if (!nombre) return;


            const { error } =
                await supabaseClient
                    .from("ochenta_y_seis")
                    .insert({ nombre: nombre });


            if (error) {

                console.error(
                    "Error agregando 86:",
                    error
                );

                mensaje86.textContent =
                    "No se pudo agregar el 86.";

                return;
            }


            input86.value = "";

            input86.focus();

            await cargar86();
        }
    );


    // Contador del botón al abrir el dashboard,
    // y refresco cada 30 s para que el número esté al día
    cargar86();
    setInterval(cargar86, 30000);
}

// ========================================
// 101 (LO QUE HAY EN EXCESO Y HAY QUE VENDER MÁS)
// ========================================

const form101 =
    document.getElementById("form-101");

const input101 =
    document.getElementById("input-101");

const lista101 =
    document.getElementById("lista-101");

const mensaje101 =
    document.getElementById("mensaje-101");

const badge101 =
    document.getElementById("badge-101");


function actualizarBadge101(cantidad) {

    if (!badge101) return;

    badge101.textContent = cantidad;

    badge101.classList.toggle(
        "hidden",
        cantidad === 0
    );
}


async function cargar101() {

    if (!lista101) return;

    const { data, error } =
        await supabaseClient
            .from("ciento_uno")
            .select("id, nombre, created_at")
            .order("created_at", { ascending: false });


    if (error) {

        console.error(
            "Error cargando 101:",
            error
        );

        if (mensaje101) {

            mensaje101.textContent =
                "No se pudo cargar la pizarra 101. " +
                "¿Está creada la tabla ciento_uno en Supabase?";
        }

        return;
    }


    if (mensaje101) mensaje101.textContent = "";

    lista101.innerHTML = "";

    actualizarBadge101(data.length);


    if (data.length === 0) {

        const vacio = document.createElement("p");

        vacio.className = "pizarra-vacio";

        vacio.textContent =
            "No hay nada en 101 por ahora.";

        lista101.appendChild(vacio);

        return;
    }


    data.forEach(function(item) {

        const tarjeta = document.createElement("div");

        tarjeta.className = "pizarra-item";

        const texto = document.createElement("div");

        const nombre = document.createElement("span");

        nombre.className = "pizarra-item-nombre";

        nombre.textContent = item.nombre;

        const hora = document.createElement("span");

        hora.className = "pizarra-item-hora";

        hora.textContent =
            new Date(item.created_at).toLocaleString(
                "es-CL",
                {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );

        texto.appendChild(nombre);
        texto.appendChild(hora);

        const borrar = document.createElement("button");

        borrar.type = "button";

        borrar.className = "pizarra-borrar";

        borrar.setAttribute("aria-label", "Borrar");

        borrar.innerHTML = "&times;";

        borrar.addEventListener("click", function() {

            borrar101(item.id);
        });

        tarjeta.appendChild(texto);
        tarjeta.appendChild(borrar);

        lista101.appendChild(tarjeta);
    });
}


async function borrar101(id) {

    const { error } =
        await supabaseClient
            .from("ciento_uno")
            .delete()
            .eq("id", id);


    if (error) {

        console.error(
            "Error borrando 101:",
            error
        );

        alert("No se pudo borrar el 101.");

        return;
    }


    await cargar101();
}


if (form101) {

    form101.addEventListener(
        "submit",
        async function(e) {

            e.preventDefault();

            const nombre = input101.value.trim();

            if (!nombre) return;


            const { error } =
                await supabaseClient
                    .from("ciento_uno")
                    .insert({ nombre: nombre });


            if (error) {

                console.error(
                    "Error agregando 101:",
                    error
                );

                mensaje101.textContent =
                    "No se pudo agregar el 101.";

                return;
            }


            input101.value = "";

            input101.focus();

            await cargar101();
        }
    );


    // Contador del botón al abrir el dashboard,
    // y refresco cada 30 s para que el número esté al día
    cargar101();
    setInterval(cargar101, 30000);
}


// Botones flotantes: abren y minimizan las pizarras 86 y 101
// (app.js carga antes que los botones en dashboard.html, por eso se espera al DOM)
document.addEventListener("DOMContentLoaded", function() {

    const pizarras = [
        { id: "p86", cargar: cargar86, input: input86 },
        { id: "p101", cargar: cargar101, input: input101 }
    ];

    function cerrarTodas() {
        pizarras.forEach(function(p) {
            const panel = document.getElementById(p.id + "-panel");
            const boton = document.getElementById(p.id + "-boton");
            if (!panel || !boton) return;
            panel.hidden = true;
            boton.classList.remove("abierto");
            boton.setAttribute("aria-expanded", "false");
        });
    }

    pizarras.forEach(function(p) {
        const boton = document.getElementById(p.id + "-boton");
        const panel = document.getElementById(p.id + "-panel");
        const minimizar = document.getElementById(p.id + "-minimizar");
        if (!boton || !panel) return;

        function alternar(abrir) {
            cerrarTodas();
            if (!abrir) return;
            panel.hidden = false;
            boton.classList.add("abierto");
            boton.setAttribute("aria-expanded", "true");
            p.cargar();
            if (p.input) p.input.focus();
        }

        boton.addEventListener("click", function() {
            alternar(panel.hidden);
        });
        if (minimizar) {
            minimizar.addEventListener("click", function() {
                alternar(false);
            });
        }
    });

    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") cerrarTodas();
    });
});

// ========================================
// USUARIOS (SOLO MASTER)
// ========================================

async function cargarUsuarios() {

    const tabla =
        document.getElementById("usuarios-tabla");

    const mensaje =
        document.getElementById("usuarios-mensaje");

    if (!tabla) return;

    mensaje.textContent = "";

    tabla.innerHTML = `
        <tr>
            <td colspan="3" class="empty">
                Cargando usuarios...
            </td>
        </tr>
    `;

    const { data, error } =
        await supabaseClient
            .from("perfiles")
            .select("id, email, rol, created_at")
            .order("created_at");

    if (error) {

        console.error(
            "Error cargando usuarios:",
            error
        );

        tabla.innerHTML = `
            <tr>
                <td colspan="3" class="empty">
                    No se pudieron cargar los usuarios.
                </td>
            </tr>
        `;

        return;
    }

    // Los que esperan cargo van primero
    data.sort(function(a, b) {

        return (a.rol ? 1 : 0) - (b.rol ? 1 : 0);
    });

    tabla.innerHTML = "";

    data.forEach(function(usuario) {

        const fila = document.createElement("tr");

        const celdaCorreo = document.createElement("td");

        celdaCorreo.textContent =
            usuario.email || "(sin correo)";

        const celdaCargo = document.createElement("td");

        const celdaAccion = document.createElement("td");

        if (usuario.rol === "master") {

            celdaCargo.textContent = "Master";

            celdaAccion.textContent = "—";

        } else {

            const selector =
                document.createElement("select");

            [
                ["", "Pendiente"],
                ["admin", "Admin"],
                ["cocina", "Cocina"],
                ["barra", "Barra"],
                ["cocina_babilonia", "Cocina Babilonia"],
                ["barra_babilonia", "Barra Babilonia"]
            ].forEach(function(opcion) {

                const o = document.createElement("option");

                o.value = opcion[0];

                o.textContent = opcion[1];

                selector.appendChild(o);

            });

            selector.value = usuario.rol || "";

            celdaCargo.appendChild(selector);

            const guardar =
                document.createElement("button");

            guardar.type = "button";

            guardar.className = "btn-action btn-edit";

            guardar.textContent = "Guardar";

            guardar.addEventListener("click", function() {

                guardarCargo(usuario.id, selector.value);
            });

            celdaAccion.appendChild(guardar);
        }

        fila.appendChild(celdaCorreo);
        fila.appendChild(celdaCargo);
        fila.appendChild(celdaAccion);

        tabla.appendChild(fila);
    });
}


async function guardarCargo(id, rol) {

    const mensaje =
        document.getElementById("usuarios-mensaje");

    const { data, error } =
        await supabaseClient
            .from("perfiles")
            .update({ rol: rol || null })
            .eq("id", id)
            .select();

    if (error || !data || data.length === 0) {

        console.error(
            "Error guardando cargo:",
            error
        );

        mensaje.textContent =
            "No se pudo guardar el cargo.";

        return;
    }

    await cargarUsuarios();

    mensaje.textContent = "Cargo actualizado.";
}
