// ================================================
//  REGLAS DEL SISTEMA EXPERTO
//  Cada regla dice: si pasa este problema, en este momento,
//  entonces se da esta recomendación.
//  (momento: null significa "sin importar cuándo")
// ================================================
const reglas = [
  // ---------- LENTITUD ----------
  { problema: "Lentitud", momento: "Al iniciar",
    recomendacion: "Revisar los programas de inicio" },
  { problema: "Lentitud", momento: "Mientras se utiliza",
    recomendacion: "Cerrar pestañas y programas en segundo plano, y revisar el administrador de tareas" },
  { problema: "Lentitud", momento: "Al ejecutar juegos",
    recomendacion: "Actualizar los drivers de la tarjeta gráfica y bajar la calidad gráfica del juego" },
  { problema: "Lentitud", momento: "Al ejecutar programas",
    recomendacion: "Revisar el uso de memoria RAM y procesador" },

  // ---------- SOBRECALENTAMIENTO ----------
  { problema: "Sobrecalentamiento", momento: "Al iniciar",
    recomendacion: "Verificar que los ventiladores giren desde el arranque y que las rejillas no estén tapadas" },
  { problema: "Sobrecalentamiento", momento: "Mientras se utiliza",
    recomendacion: "Limpiar los ventiladores y revisar la refrigeración" },
  { problema: "Sobrecalentamiento", momento: "Al ejecutar juegos",
    recomendacion: "Mejorar la refrigeración: cambiar la pasta térmica o usar una base refrigerante" },
  { problema: "Sobrecalentamiento", momento: "Al ejecutar programas",
    recomendacion: "Cerrar programas pesados, revisar el uso del procesador y limpiar el polvo interno" },

  // ---------- NO ENCIENDE ----------
  { problema: "No enciende", momento: null,
    recomendacion: "Revisar la fuente de alimentación y las conexiones" },
  { problema: "No enciende", momento: "Al iniciar",
    recomendacion: "Probar con otro cable o toma de corriente, desconectar periféricos y reasentar la memoria RAM" },
  { problema: "No enciende", momento: "Mientras se utiliza",
    recomendacion: "Si se apagó solo, dejarlo enfriar unos minutos y revisar la batería o el cargador" },
  { problema: "No enciende", momento: "Al ejecutar juegos",
    recomendacion: "Revisar que la fuente tenga la potencia suficiente para la tarjeta gráfica" },
  { problema: "No enciende", momento: "Al ejecutar programas",
    recomendacion: "Revisar el estado del disco duro y de la fuente de alimentación" },

  // ---------- REINICIOS ----------
  { problema: "Reinicios", momento: "Al iniciar",
    recomendacion: "Revisar el disco y la memoria RAM, y reparar o reinstalar el sistema operativo" },
  { problema: "Reinicios", momento: "Mientras se utiliza",
    recomendacion: "Revisar la fuente de alimentación y buscar virus o actualizaciones fallidas" },
  { problema: "Reinicios", momento: "Al ejecutar juegos",
    recomendacion: "Revisar la temperatura y la fuente de alimentación" },
  { problema: "Reinicios", momento: "Al ejecutar programas",
    recomendacion: "Revisar la compatibilidad del programa, actualizar los drivers y probar la memoria RAM" }
];


// ================================================
//  FUNCIÓN PARA MOSTRAR EL RESULTADO EN PANTALLA
//  clase: "ok" (verde) o "error" (rojo)
// ================================================
function mostrar(clase, html) {
  const caja = document.getElementById("resultado");
  caja.className = clase;
  caja.innerHTML = html;
  caja.style.display = "block";
}


// ================================================
//  FUNCIÓN PRINCIPAL: se ejecuta al darle "Diagnosticar"
// ================================================
function diagnosticar() {
  // 1. Leer lo que eligió el usuario
  const problema = document.getElementById("problema").value;
  const momento = document.getElementById("momento").value;

  // 2. Verificar que haya elegido las dos opciones
  if (problema === "" || momento === "") {
    mostrar("error",
      '<div class="titulo">⚠️ Faltan datos</div>Por favor selecciona una opción en ambas preguntas.');
    return;
  }

  // 3. Buscar las reglas que coinciden
  const coincidencias = reglas.filter(function (regla) {
    const mismoProblema = regla.problema === problema;
    const mismoMomento = regla.momento === null || regla.momento === momento;
    return mismoProblema && mismoMomento;
  });

  // 4. Si no hay ninguna regla
  if (coincidencias.length === 0) {
    mostrar("error",
      '<div class="titulo">🤔 Sin recomendación</div>No tengo una recomendación para esa combinación. Te sugiero llevar el equipo a revisión técnica.');
    return;
  }

  // 5. Mostrar las recomendaciones encontradas
  let lista = "";
  coincidencias.forEach(function (regla) {
    lista += "<li>" + regla.recomendacion + "</li>";
  });

  mostrar("ok", '<div class="titulo">✅ Recomendación</div><ul>' + lista + "</ul>");
}


// ================================================
//  FUNCIÓN PARA LIMPIAR TODO
// ================================================
function limpiar() {
  document.getElementById("problema").value = "";
  document.getElementById("momento").value = "";
  document.getElementById("resultado").style.display = "none";
}
