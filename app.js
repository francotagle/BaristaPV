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

    mermas:
        document.getElementById("section-mermas"),

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