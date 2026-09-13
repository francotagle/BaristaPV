const SUPABASE_URL = "https://vuwqqcfptvlgikjczpqx.supabase.co";
const SUPABASE_KEY = "sb_publishable_7BqYGds7iv0CJtMXn5Zqxg_NmuAz2bh";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


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

        const { error } =
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

        mensaje.textContent =
            "¡Inicio de sesión correcto!";

        setTimeout(function() {

            window.location.href = "dashboard.html";

        }, 500);
    });
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
            window.location.pathname.endsWith("/")
        )
    ) {

        window.location.href = "dashboard.html";
    }
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

    productos:
        document.getElementById("section-productos"),

    entradas:
        document.getElementById("section-entradas"),

    salidas:
        document.getElementById("section-salidas"),

    facturas:
        document.getElementById("section-facturas"),

    reportes:
        document.getElementById("section-reportes")
};


menuItems.forEach(function(button) {

    button.addEventListener("click", function() {

        const sectionName =
            button.dataset.section;

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


        if (sectionName === "facturas") {

            cargarFacturas();

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

            const costo =
                parseFloat(
                    document.getElementById(
                        "producto-costo"
                    ).value
                ) || 0;


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

                costo_unitario: costo,

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

async function cargarProductos() {

    const tabla =
        document.getElementById(
            "productos-tabla"
        );

    if (!tabla) return;


    tabla.innerHTML = `
        <tr>
            <td colspan="8" class="empty">
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
                costo_unitario,
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
                <td colspan="8" class="empty">
                    Error al cargar productos.
                </td>
            </tr>
        `;

        return;
    }


    if (!data || data.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="8" class="empty">
                    No hay productos registrados.
                </td>
            </tr>
        `;

        return;
    }


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

            <td>
                $${Number(
                    producto.costo_unitario
                ).toLocaleString("es-CL")}
            </td>

            <td class="${claseStock}">
                ${estado}
            </td>

            <td>

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


    document.getElementById(
        "producto-costo"
    ).value = data.costo_unitario;


    document.querySelector(
        "#modal-producto h2"
    ).textContent =
        "Editar producto";


    document.getElementById(
        "producto-mensaje"
    ).textContent = "";


    modalProducto
        .classList
        .remove("hidden");
}


// ========================================
// ENTRADAS
// ========================================

const btnNuevaEntrada =
    document.getElementById(
        "btn-nueva-entrada"
    );

const modalEntrada =
    document.getElementById(
        "modal-entrada"
    );

const entradaForm =
    document.getElementById(
        "entrada-form"
    );


// ========================================
// NUEVA ENTRADA
// ========================================

if (btnNuevaEntrada) {

    btnNuevaEntrada.addEventListener(
        "click",
        async function() {

            entradaForm.reset();

            document.getElementById(
                "entrada-mensaje"
            ).textContent = "";

            modalEntrada
                .classList
                .remove("hidden");


            await cargarProductosParaEntrada();

        }
    );
}


// ========================================
// CARGAR PRODUCTOS PARA ENTRADA
// ========================================

async function cargarProductosParaEntrada() {

    const select =
        document.getElementById(
            "entrada-producto"
        );


    if (!select) return;


    select.innerHTML = `
        <option value="">
            Cargando productos...
        </option>
    `;


    const { data, error } =
        await supabaseClient
            .from("productos")
            .select(
                "id, nombre, unidad, stock_actual"
            )
            .eq("activo", true)
            .order("nombre");


    if (error) {

        console.error(
            "Error cargando productos para entrada:",
            error
        );


        select.innerHTML = `
            <option value="">
                Error al cargar productos
            </option>
        `;

        return;
    }


    select.innerHTML = `
        <option value="">
            Seleccionar producto
        </option>
    `;


    data.forEach(function(producto) {

        const option =
            document.createElement("option");


        option.value =
            producto.id;


        option.textContent =
            `${producto.nombre} (${producto.unidad}) - Stock: ${producto.stock_actual}`;


        select.appendChild(option);

    });
}


// ========================================
// REGISTRAR ENTRADA
// ========================================

if (entradaForm) {

    entradaForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const mensaje =
                document.getElementById(
                    "entrada-mensaje"
                );


            mensaje.textContent =
                "Registrando entrada...";


            const productoId =
                document.getElementById(
                    "entrada-producto"
                ).value;


            const cantidad =
                parseFloat(
                    document.getElementById(
                        "entrada-cantidad"
                    ).value
                );


            const proveedor =
                document.getElementById(
                    "entrada-proveedor"
                ).value.trim();


            const documento =
                document.getElementById(
                    "entrada-documento"
                ).value.trim();


            const observacion =
                document.getElementById(
                    "entrada-observacion"
                ).value.trim();


            if (!productoId) {

                mensaje.textContent =
                    "Selecciona un producto.";

                return;
            }


            if (
                !cantidad ||
                cantidad <= 0
            ) {

                mensaje.textContent =
                    "Ingresa una cantidad válida.";

                return;
            }


            const { data: producto, error: errorProducto } =
                await supabaseClient
                    .from("productos")
                    .select(
                        "id, stock_actual"
                    )
                    .eq("id", productoId)
                    .single();


            if (errorProducto) {

                console.error(
                    "Error obteniendo producto:",
                    errorProducto
                );

                mensaje.textContent =
                    "No se pudo obtener el stock actual.";

                return;
            }


            const nuevoStock =
                Number(producto.stock_actual || 0) +
                Number(cantidad);


            const { error: errorEntrada } =
                await supabaseClient
                    .from("entradas")
                    .insert([{

                        producto_id:
                            parseInt(productoId),

                        cantidad:
                            cantidad,

                        proveedor:
                            proveedor || null,

                        documento:
                            documento || null,

                        observacion:
                            observacion || null

                    }]);


            if (errorEntrada) {

                console.error(
                    "Error guardando entrada:",
                    errorEntrada
                );

                mensaje.textContent =
                    "Error al registrar la entrada.";

                return;
            }


            const { error: errorStock } =
                await supabaseClient
                    .from("productos")
                    .update({

                        stock_actual:
                            nuevoStock

                    })
                    .eq("id", productoId);


            if (errorStock) {

                console.error(
                    "Error actualizando stock:",
                    errorStock
                );


                mensaje.textContent =
                    "La entrada se guardó, pero hubo un error actualizando el stock.";

                return;
            }


            mensaje.textContent =
                "¡Entrada registrada correctamente!";


            await cargarEntradas();

            await cargarProductos();

            await actualizarResumen();


            setTimeout(function() {

                modalEntrada
                    .classList
                    .add("hidden");

            }, 800);

        }
    );
}


// ========================================
// CARGAR ENTRADAS
// ========================================

async function cargarEntradas() {

    const tabla =
        document.getElementById(
            "entradas-tabla"
        );


    if (!tabla) return;


    tabla.innerHTML = `
        <tr>
            <td colspan="6" class="empty">
                Cargando entradas...
            </td>
        </tr>
    `;


    const { data, error } =
        await supabaseClient
            .from("entradas")
            .select(`
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
            `)
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(
            "Error cargando entradas:",
            error
        );


        tabla.innerHTML = `
            <tr>
                <td colspan="6" class="empty">
                    Error al cargar entradas.
                </td>
            </tr>
        `;

        return;
    }


    if (!data || data.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="6" class="empty">
                    No hay entradas registradas.
                </td>
            </tr>
        `;

        return;
    }


    tabla.innerHTML = "";


    data.forEach(function(entrada) {

        const fecha =
            new Date(
                entrada.created_at
            ).toLocaleString(
                "es-CL",
                {
                    dateStyle: "short",
                    timeStyle: "short"
                }
            );


        const producto =
            entrada.productos
                ? entrada.productos.nombre
                : "Producto eliminado";


        const fila =
            document.createElement("tr");


        fila.innerHTML = `

            <td>
                ${fecha}
            </td>

            <td>
                <strong>
                    ${producto}
                </strong>
            </td>

            <td>
                ${entrada.cantidad}
            </td>

            <td>
                ${entrada.proveedor || "-"}
            </td>

            <td>
                ${entrada.documento || "-"}
            </td>

            <td>
                ${entrada.observacion || "-"}
            </td>

        `;


        tabla.appendChild(fila);

    });
}


// ========================================
// RESUMEN DEL INICIO
// ========================================

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
