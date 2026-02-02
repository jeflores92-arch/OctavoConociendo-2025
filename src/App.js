import React, { useState, useEffect } from "react";
import {
  Lightbulb,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Calculator,
  User,
  School,
  BookOpen,
  Medal,
  RefreshCw,
  LayoutGrid,
  X,
  Flag,
  Zap,
  Activity,
  ActivitySquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// --- UTILIDADES ---
const shuffleOptions = (options) => {
  return [...options].sort(() => Math.random() - 0.5);
};

// --- BASE DE DATOS: 8° GRADO (25 ÍTEMS) ---
const BANCO_PREGUNTAS = [
  {
    id: 1,
    titulo: "Vectores y Componentes",
    aprendizaje:
      "Un vector (como una flecha) que está inclinado se puede 'desarmar' en dos partes: una sombra en el suelo (Eje X) y una sombra en la pared (Eje Y). A estas sombras se les llama componentes rectangulares.",
    contexto:
      "Experimento con lámparas produciendo sombras de un lápiz en el eje 'x' y el eje 'y'.",
    pregunta: "Si el lápiz representa un vector, ¿qué representan las sombras?",
    opciones: [
      "Las componentes rectangulares del vector.",
      "El ángulo, por lo tanto, la dirección del vector.",
      "El resultado de la suma vectorial efectuada.",
      "El sentido y magnitud del vector.",
    ],
    correcta: "Las componentes rectangulares del vector.",
    pista: "Son las proyecciones del vector sobre los ejes cartesianos.",
  },
  {
    id: 2,
    titulo: "Ondas Transversales",
    aprendizaje:
      "En una cuerda, si mueves la mano de arriba a abajo (vertical), la onda avanza hacia el frente (horizontal). Cuando el movimiento es perpendicular (formando una cruz) a la dirección de avance, se llama onda transversal.",
    contexto:
      "Imagen de una cuerda siendo agitada. La mano se mueve arriba-abajo, la onda avanza hacia la derecha.",
    pregunta:
      "La onda formada por el movimiento de la cuerda se considera transversal porque la dirección de las oscilaciones...",
    opciones: [
      "se repite a lo largo de la dirección de propagación de la onda.",
      "es paralela al movimiento de la propagación de la onda.",
      "es perpendicular a la dirección de propagación de la onda.",
      "se dirige contraria a la de propagación de la onda.",
    ],
    correcta: "es perpendicular a la dirección de propagación de la onda.",
    pista:
      "Perpendicular significa que forman un ángulo de 90 grados (como una T).",
  },
  {
    id: 3,
    titulo: "Conservación de Energía",
    tipo: "simulador_energia",
    aprendizaje:
      "La energía mecánica se conserva. En el punto más alto, toda es Potencial (Ug). En el punto más bajo, toda se ha convertido en Cinética (K) por la velocidad. En el punto más bajo la altura es 0, así que la Potencial debe ser 0.",
    contexto:
      "Una patinadora baja por una rampa curva. Se analiza el punto más bajo (0 m).",
    pregunta:
      "Selecciona la gráfica que representa correctamente los valores de energía mecánica, cinética y potencial gravitatoria en el punto más bajo.",
    opciones: [
      "Gráfica A (E alta, K alta, Ug alta).",
      "Gráfica B (E alta, K cero, Ug alta).",
      "Gráfica C (E alta, K alta, Ug cero).",
      "Gráfica D (E alta, K media, Ug media).",
    ],
    correcta: "Gráfica C (E alta, K alta, Ug cero).",
    pista:
      "En el suelo (0 metros), no hay altura, por lo tanto no hay Energía Potencial (Ug). Busca la gráfica donde Ug sea cero.",
  },
  {
    id: 4,
    titulo: "Movimiento Parabólico",
    aprendizaje:
      "Cuando lanzas algo al aire (como un hombre bala), se mueve hacia adelante y hacia arriba. La gravedad lo va frenando hacia arriba hasta que cae, formando una curva (parábola). La gravedad es la clave.",
    contexto: "Trayectoria de un hombre bala con ángulo de 45 grados.",
    pregunta: "La trayectoria del 'Hombre bala' es parabólica por...",
    opciones: [
      "la fricción del aire en el movimiento horizontal.",
      "la velocidad constante en los ejes horizontal y vertical.",
      "la aceleración de la gravedad en el eje horizontal.",
      "la influencia de la gravedad en el movimiento vertical.",
    ],
    correcta: "la influencia de la gravedad en el movimiento vertical.",
    pista: "La gravedad hala las cosas hacia abajo, curvando su camino.",
  },
  {
    id: 5,
    titulo: "Potencia Mecánica",
    aprendizaje:
      "Potencia es qué tan rápido haces un trabajo. Si dos máquinas levantan lo mismo, la más potente es la que lo hace en MENOS tiempo.",
    contexto:
      "Máquina 1 tarda 6 segundos. Máquina 2 tarda 3 segundos. Ambas levantan 200kg.",
    pregunta:
      "Si ambas máquinas realizan el mismo trabajo, la opción más recomendable para el empresario es la máquina...",
    opciones: [
      "1, ya que es dos veces más rápida que la máquina 2.",
      "2, porque es seis veces más rápida que la máquina 1.",
      "1, porque es el doble de potente que la máquina 2.",
      "2, ya que es el doble de potente que la máquina 1.",
    ],
    correcta: "2, ya que es el doble de potente que la máquina 1.",
    pista:
      "La Máquina 2 tardó la mitad del tiempo, por lo tanto tiene el doble de potencia.",
  },
  {
    id: 6,
    titulo: "Centrales Hidroeléctricas",
    aprendizaje:
      "El agua quieta en la represa tiene Energía Potencial. Al caer, gana velocidad (Cinética). Al mover la turbina y el generador, se convierte en Eléctrica.",
    contexto: "Esquema de una represa hidroeléctrica.",
    pregunta:
      "Selecciona la opción que representa a las conversiones de energía en una central hidroeléctrica.",
    opciones: [
      "Energía cinética → energía potencial → energía eléctrica.",
      "Energía potencial → energía cinética → energía eléctrica.",
      "Energía cinética → energía eléctrica → energía potencial.",
      "Energía potencial → energía térmica → energía cinética.",
    ],
    correcta: "Energía potencial → energía cinética → energía eléctrica.",
    pista:
      "Orden: Altura (Potencial) -> Movimiento (Cinética) -> Luz (Eléctrica).",
  },
  {
    id: 7,
    titulo: "Tercera Ley de Newton",
    aprendizaje:
      "En el espacio, si empujas a alguien, tú te mueves hacia atrás con la misma fuerza. Es la ley de Acción y Reacción. El momento lineal se conserva.",
    contexto: "Dos astronautas (A y B) se empujan entre sí en el espacio.",
    pregunta:
      "Considerando que el momento lineal se conserva, ¿qué sucede con los astronautas luego de la interacción?",
    opciones: [
      "Cada uno se mueve hacia atrás debido al impulso que uno ejerce sobre el otro.",
      "Ambos se mueven en la dirección de quien ejerció mayor impulso.",
      "Ninguno de los dos se mueve ya que no existen fuerzas externas.",
      "Experimentan un cambio en su masa manteniendo su velocidad constante.",
    ],
    correcta:
      "Cada uno se mueve hacia atrás debido al impulso que uno ejerce sobre el otro.",
    pista:
      "Es como empujar una pared con patines: sales disparado hacia atrás.",
  },
  {
    id: 8,
    titulo: "Sonido y Vibración",
    aprendizaje:
      "El sonido no es magia, es aire moviéndose. Cuando la cuerda vibra, golpea las moléculas de aire, creando una onda de presión que llega a tu oído.",
    contexto: "Tocar una guitarra produce sonido.",
    pregunta:
      "La vibración de las cuerdas genera ondas sonoras debido a que produce...",
    opciones: [
      "un desplazamiento de ondas en el aire, lo que produce sonido.",
      "movimiento oscilatorio del aire que se propaga a través de este.",
      "fuerzas que se convierten en sonido cuando llega a nuestros oídos.",
      "una corriente eléctrica que se genera en las cuerdas y llega a los oídos.",
    ],
    correcta:
      "movimiento oscilatorio del aire que se propaga a través de este.",
    pista:
      "El sonido es una onda mecánica que necesita un medio (aire) para vibrar.",
  },
  {
    id: 9,
    titulo: "Movimiento Circular",
    aprendizaje:
      "Para que algo gire, necesita una fuerza que lo jale hacia el centro (centrípeta). Las sillas se inclinan buscando un equilibrio entre la gravedad y la inercia que intenta seguir derecho.",
    contexto: "Juego mecánico de sillas voladoras girando.",
    pregunta:
      "¿Qué fuerza explica el movimiento de las sillas hacia afuera durante el funcionamiento del juego mecánico?",
    opciones: [
      "La fuerza centrípeta, que mantiene a las sillas girando en círculo.",
      "La fuerza de empuje, que impulsa a las sillas hacia el exterior del círculo.",
      "La fuerza gravitacional, que actúa sobre las sillas.",
      "La fuerza de fricción entre las cadenas y asientos.",
    ],
    correcta:
      "La fuerza centrípeta, que mantiene a las sillas girando en círculo.",
    pista:
      "Científicamente, no hay una fuerza 'hacia afuera' (centrífuga) real, es la inercia. La única fuerza real actuando para mantener el giro es la centrípeta.",
  },
  {
    id: 10,
    titulo: "El Péndulo y la Fricción",
    aprendizaje:
      "En el mundo real existe el aire. El aire frena las cosas (fricción). Por eso, un péndulo no se mueve para siempre, su energía se va perdiendo poco a poco.",
    contexto: "Un péndulo oscilando que eventualmente se detiene.",
    pregunta:
      "Según la ley de conservación de la energía mecánica, se concluye que la energía mecánica del péndulo...",
    opciones: [
      "se transforma en energía gravitacional.",
      "aumenta debido al incremento de la fricción.",
      "disminuye por la acción de la gravedad.",
      "no se conserva, se disipa debido a la fricción.",
    ],
    correcta: "no se conserva, se disipa debido a la fricción.",
    pista:
      "Si se detiene, es porque la energía se 'perdió' (se disipó) en forma de calor por el roce con el aire.",
  },
  {
    id: 11,
    titulo: "Concentración Química",
    aprendizaje:
      "Concentración es qué tan 'fuerte' está una mezcla. Si pones poca pintura y mucha agua, la concentración es baja. Es la relación entre cuánto soluto (pintura) hay en el total.",
    contexto:
      "Camila diluye pintura con agua en varias etapas, notando que el color disminuye.",
    pregunta: "A partir del texto, ¿cómo definirías la concentración química?",
    opciones: [
      "La cantidad de una sustancia en relación con el total de la mezcla.",
      "La cantidad de agua añadida a una sustancia para diluirla.",
      "La reacción entre las sustancias mezcladas.",
      "La densidad de la mezcla resultante.",
    ],
    correcta:
      "La cantidad de una sustancia en relación con el total de la mezcla.",
    pista: "Es una fracción: Soluto dividido entre Solución total.",
  },
  {
    id: 12,
    titulo: "Unidades de Concentración",
    aprendizaje:
      "En las medicinas, las etiquetas nos dicen la concentración. '20 mg/g' significa que hay 20 miligramos de medicina por cada gramo de crema.",
    contexto: "Etiqueta de crema antibiótica: 'Ácido fusídico 20mg/g'.",
    pregunta:
      "A partir de lo observado, podemos afirmar que la unidad física de concentración en la crema se expresa en...",
    opciones: ["2 g", "15 g", "20 mg", "20 mg/g"],
    correcta: "20 mg/g",
    pista: "Busca la unidad compuesta (algo sobre algo) en la etiqueta.",
  },
  {
    id: 13,
    titulo: "Disolución y Agitación",
    aprendizaje:
      "Agitar una mezcla ayuda a que las partículas del polvo choquen más rápido con el agua, acelerando que se disuelvan y queden parejas en todo el vaso.",
    contexto: "Preparación de suero agitando el envase.",
    pregunta:
      "Según la información, ¿por qué se debe agitar la mezcla del suero en agua?",
    opciones: [
      "Porque este proceso físico impide la disolución.",
      "Porque permite que las moléculas se desintegren.",
      "Porque aumenta la interacción entre las moléculas, logrando una dosis uniforme.",
      "Porque genera un aumento de temperatura.",
    ],
    correcta:
      "Porque aumenta la interacción entre las moléculas, logrando una dosis uniforme.",
    pista:
      "Agitar mezcla las partículas para que no queden grumos y la medicina esté igual en todas partes.",
  },
  {
    id: 14,
    titulo: "Soluciones Saturadas",
    aprendizaje:
      "Una solución está 'saturada' cuando el agua ya no puede aguantar más azúcar. Es como cuando comes demasiado y ya no puedes más. El exceso se va al fondo.",
    contexto:
      "Carlos agrega azúcar al té hasta que queda en el fondo sin disolverse.",
    pregunta:
      "Según lo anterior, ¿qué significa que la solución esté saturada?",
    opciones: [
      "La cantidad de solvente se reduce.",
      "El solvente no tiene capacidad para disolver más soluto.",
      "El soluto forma una nueva solución.",
      "El azúcar cambia su naturaleza química.",
    ],
    correcta: "El solvente no tiene capacidad para disolver más soluto.",
    pista:
      "El 'solvente' (té) ya está lleno y no acepta más 'soluto' (azúcar).",
  },
  {
    id: 15,
    titulo: "Eficiencia de Limpieza",
    aprendizaje:
      "Si un producto está más concentrado (tiene más soluto), suele ser más fuerte y efectivo para trabajos difíciles como limpiar grasa.",
    contexto: "Limpiador 1: 10ml en 1 litro. Limpiador 2: 50ml en 1 litro.",
    pregunta:
      "Si la eficiencia es mayor con más soluto, ¿qué limpiador debería usar Manuel?",
    opciones: [
      "El limpiador 2, porque tiene una mayor concentración de soluto.",
      "El limpiador 1, porque tiene una menor concentración.",
      "El limpiador 1, por ser más eficiente para diluir.",
      "El limpiador 2, porque tiene más solvente.",
    ],
    correcta: "El limpiador 2, porque tiene una mayor concentración de soluto.",
    pista: "50 ml es más que 10 ml. Más jabón = mayor concentración.",
  },
  {
    id: 16,
    titulo: "Propiedades Ópticas",
    aprendizaje:
      "La diafanidad nos dice si la luz pasa o no. Transparente (pasa toda), Translúcido (pasa poca), Opaco (no pasa nada).",
    contexto:
      "Experimento con linterna: Agua (transparente), Jabón (translúcido), Cartón (opaco).",
    pregunta: "Según el resultado del experimento, ¿qué significa diafanidad?",
    opciones: [
      "Capacidad de cambiar de color.",
      "Propiedad de reflejar la luz.",
      "Propiedad que describe cómo la luz se comporta al incidir y atravesar un material.",
      "Propiedad que mide el calor absorbido.",
    ],
    correcta:
      "Propiedad que describe cómo la luz se comporta al incidir y atravesar un material.",
    pista: "Se trata de si la luz puede 'atravesar' el objeto.",
  },
  {
    id: 17,
    titulo: "Punto de Ebullición",
    aprendizaje:
      "El agua pura hierve y se va toda. El agua con sal (mar) también hierve, pero la sal se queda. Además, las mezclas suelen hervir a diferente temperatura que el agua pura.",
    contexto:
      "Abigail calienta agua pura y agua de mar. La pura se evapora toda, la de mar deja residuo.",
    pregunta: "¿Qué se está investigando con este experimento?",
    opciones: [
      "El efecto de la concentración de salinidad en el punto de ebullición y evaporación.",
      "Los efectos químicos del agua de mar.",
      "Los cambios de volumen.",
      "La influencia de la temperatura.",
    ],
    correcta:
      "El efecto de la concentración de salinidad en el punto de ebullición del agua.",
    pista:
      "Al comparar agua sola vs agua con sal, estudias cómo la sal cambia las propiedades físicas.",
  },
  {
    id: 18,
    titulo: "Contracción Muscular",
    aprendizaje:
      "Tus músculos se mueven gracias a dos proteínas microscópicas: Actina y Miosina. Ellas se deslizan una sobre otra como un cierre de ropa para acortar el músculo.",
    contexto: "Esquema de fibra muscular con Actina y Miosina.",
    pregunta:
      "¿Por qué la miosina y actina son indispensables para el movimiento del cuerpo?",
    opciones: [
      "Se enlazan y generan energía.",
      "Producen en conjunto la contracción muscular.",
      "Brindan fuerza y flexibilidad.",
      "Causan crecimiento celular.",
    ],
    correcta: "Producen en conjunto la contracción muscular.",
    pista: "El texto dice que su deslizamiento 'contrae' el músculo.",
  },
  {
    id: 19,
    titulo: "Transporte en Plantas",
    aprendizaje:
      "Las plantas fabrican azúcar en las hojas (arriba) y la mandan a los frutos. Para mover esa comida, usan unos tubos internos llamados Tejidos Vasculares (floema).",
    contexto: "Mangos ricos en glucosa producida en las hojas.",
    pregunta: "Hay presencia de glucosa en el fruto debido a tejidos...",
    opciones: [
      "epidérmicos ubicados en las semillas.",
      "vasculares que permiten su circulación entre los órganos.",
      "absorbentes desde la raíz.",
      "fotosintéticos en el fruto.",
    ],
    correcta: "vasculares que permiten su circulación entre los órganos.",
    pista:
      "Necesitan un sistema de 'tuberías' para llevar el azúcar de la hoja al mango.",
  },
  {
    id: 20,
    titulo: "Digestión y Nutrientes",
    aprendizaje:
      "La digestión es como desarmar un lego. Comes estructuras grandes (proteínas) y el cuerpo las rompe en piezas pequeñas (aminoácidos) para poder usarlas.",
    contexto: "Esquema: Proteínas -> Aminoácidos, Carbohidratos -> Azúcares.",
    pregunta: "Según la información anterior, los alimentos ingeridos...",
    opciones: [
      "pasan de nutrientes a moléculas complejas.",
      "se descomponen químicamente para pasar de macromoléculas a glicerol.",
      "se convierten en vitaminas.",
      "son transformados en moléculas simples asimilables por el cuerpo.",
    ],
    correcta:
      "son transformados en moléculas simples asimilables por el cuerpo.",
    pista:
      "El objetivo es hacerlos lo suficientemente pequeños para que la sangre los absorba.",
  },
  {
    id: 21,
    titulo: "Tejidos Vegetales",
    aprendizaje:
      "Los árboles crecen a lo ancho gracias a un tejido especial. La corteza dura que los protege es formada por el crecimiento secundario (meristemos laterales).",
    contexto: "Árboles con diferentes tipos de cortezas para protección.",
    pregunta:
      "¿Cuál es el tejido en el que ocurren estas adaptaciones para la formación de corteza?",
    opciones: [
      "El tejido colénquima.",
      "El tejido esclerénquima.",
      "El tejido parénquima.",
      "El tejido meristemático porque permite el crecimiento.",
    ],
    correcta:
      "El tejido meristemático porque permite el crecimiento en longitud.",
    pista:
      "El 'Meristemo' es el tejido que siempre está creando nuevas células para crecer.",
  },
  {
    id: 22,
    titulo: "Definición de Tejido",
    aprendizaje:
      "Un tejido no es un hueso ni un órgano. Es un EQUIPO de células del mismo tipo que trabajan juntas para hacer una tarea (como los osteocitos formando hueso).",
    contexto: "Osteoblastos y osteocitos trabajando en el hueso.",
    pregunta: "Según la información anterior, ¿qué es un tejido?",
    opciones: [
      "Conjunto de huesos.",
      "Células individuales.",
      "Grupo de órganos.",
      "Conjunto de células que realizan funciones específicas.",
    ],
    correcta: "Conjunto de células que realizan funciones específicas.",
    pista: "Recuerda los niveles: Célula -> Tejido -> Órgano.",
  },
  {
    id: 23,
    titulo: "Análisis de Experimento",
    aprendizaje:
      "Mira las barras del gráfico. La barra más alta (15 cm) está en el grupo de 'Luz Intensa a 30°C'. Eso significa que esas condiciones fueron las mejores.",
    contexto:
      "Gráficas de crecimiento de mango bajo distintas luces y temperaturas.",
    pregunta:
      "A partir de las gráficas, ¿qué se concluye sobre las plantas de mango?",
    opciones: [
      "La luz intensa y la temperatura de 30°C favorece el crecimiento.",
      "La luz baja genera crecimiento nulo.",
      "Solo la temperatura influye.",
      "Solo el tipo de luz influye.",
    ],
    correcta:
      "La luz intensa y la temperatura de 30°C favorece el crecimiento.",
    pista: "Busca la planta más alta en el dibujo y mira qué dice abajo.",
  },
  {
    id: 24,
    titulo: "Función Renal",
    aprendizaje:
      "Los riñones son el filtro del cuerpo. No absorben comida (eso lo hace el intestino). Su trabajo es sacar la basura (urea, sales extra) a través de la orina.",
    contexto: "Texto sobre digestión vs función de los riñones.",
    pregunta: "Según el texto anterior, ¿cuál es la función de los riñones?",
    opciones: [
      "Absorben los alimentos.",
      "Fortalecen los glóbulos rojos.",
      "Mantienen el equilibrio interno del cuerpo.",
      "Separan los nutrientes.",
    ],
    correcta: "Mantienen el equilibrio interno del cuerpo.",
    pista:
      "Al eliminar desechos y regular el agua, mantienen el equilibrio (homeostasis).",
  },
  {
    id: 25,
    titulo: "Frecuencia Cardíaca",
    aprendizaje:
      "Si estás enfermo de los pulmones (Grupo C), te entra menos oxígeno (89%). Tu corazón tiene que latir más rápido para compensar y tratar de llevar oxígeno a todos lados.",
    contexto: "Tabla: Sedentario (94%), Atleta (98%), Enfermo (89%).",
    pregunta:
      "Según la tabla, se infiere que la frecuencia cardíaca en reposo...",
    opciones: [
      "del atleta será mayor.",
      "del atleta y sedentario serán altos.",
      "de la persona con enfermedad será mayor por su bajo nivel de oxigeno.",
      "del sedentario será menor.",
    ],
    correcta:
      "de la persona con enfermedad será mayor por su bajo nivel de oxigeno.",
    pista:
      "Menos oxígeno en sangre = El corazón debe trabajar el doble para compensar.",
  },
];

// --- COMPONENTE SIMULADOR (ENERGÍA - ÍTEM 3) ---
const EnergiaSim = () => {
  const [altura, setAltura] = useState(4);
  const mass = 60;
  const g = 9.8;
  const totalEnergy = mass * g * 4; // Energía total constante (altura máx 4m)

  const potential = mass * g * altura;
  const kinetic = totalEnergy - potential;

  // Normalizar para barras gráficas (porcentaje)
  const pPct = (potential / totalEnergy) * 100;
  const kPct = (kinetic / totalEnergy) * 100;

  return (
    <div className="bg-slate-800 p-6 rounded-3xl text-white my-6 border-2 border-blue-400 shadow-xl">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Activity size={24} className="text-yellow-400" />
        <h4 className="font-black text-lg tracking-wider">PISTA DE ENERGÍA</h4>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <div className="flex justify-between text-xs font-bold uppercase mb-2">
            <span className="text-blue-300">Altura de la Patinadora</span>
            <span className="text-white">{altura} m</span>
          </div>
          <input
            type="range"
            min="0"
            max="4"
            step="0.5"
            value={altura}
            onChange={(e) => setAltura(Number(e.target.value))}
            className="w-full h-3 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>Suelo (0m)</span>
            <span>Cima (4m)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center">
            <div className="h-32 w-16 bg-slate-700 mx-auto rounded-t-xl relative overflow-hidden border border-slate-600">
              <motion.div
                className="absolute bottom-0 w-full bg-blue-500"
                animate={{ height: `${pPct}%` }}
              />
            </div>
            <p className="text-xs mt-2 font-bold text-blue-400">
              Potencial (Ug)
            </p>
            <p className="text-[10px] text-slate-300">
              {Math.round(potential)} J
            </p>
          </div>
          <div className="text-center">
            <div className="h-32 w-16 bg-slate-700 mx-auto rounded-t-xl relative overflow-hidden border border-slate-600">
              <motion.div
                className="absolute bottom-0 w-full bg-green-500"
                animate={{ height: `${kPct}%` }}
              />
            </div>
            <p className="text-xs mt-2 font-bold text-green-400">
              Cinética (K)
            </p>
            <p className="text-[10px] text-slate-300">
              {Math.round(kinetic)} J
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 italic">
          {altura === 0
            ? "¡En el suelo toda la energía es Cinética!"
            : altura === 4
            ? "¡En la cima toda la energía es Potencial!"
            : "La energía se transforma, no se pierde."}
        </p>
      </div>
    </div>
  );
};

// --- APP PRINCIPAL ---
export default function App() {
  const [fase, setFase] = useState("registro");
  const [user, setUser] = useState({ nombre: "", grado: "", seccion: "" });
  const [idx, setIdx] = useState(0);
  const [subFase, setSubFase] = useState("educa");
  const [opciones, setOpciones] = useState([]);
  const [seleccion, setSeleccion] = useState(null);
  const [showNav, setShowNav] = useState(false);
  const [respuestasUsuario, setRespuestasUsuario] = useState({});

  const item = BANCO_PREGUNTAS[idx];

  // Mezclar opciones al cambiar de pregunta
  useEffect(() => {
    if (item) setOpciones(shuffleOptions(item.opciones));
    setSeleccion(null);
  }, [idx, item]);

  const handleSelect = (opt) => {
    setSeleccion(opt);
    const esCorrecta = opt === item.correcta;
    setRespuestasUsuario((prev) => ({ ...prev, [idx]: esCorrecta }));
    if (esCorrecta)
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
  };

  const getMedal = () => {
    const preguntasRespondidas = Object.keys(respuestasUsuario).length;
    const aciertos = Object.values(respuestasUsuario).filter(
      (val) => val === true
    ).length;
    const pct =
      preguntasRespondidas === 0 ? 0 : (aciertos / preguntasRespondidas) * 100;

    if (pct >= 90)
      return {
        icon: <Medal size={80} className="text-yellow-400 drop-shadow-lg" />,
        text: "Medalla de ORO",
        color: "text-yellow-500",
        msg: "¡Impresionante! Eres un experto.",
      };
    if (pct >= 70)
      return {
        icon: <Medal size={80} className="text-slate-300 drop-shadow-lg" />,
        text: "Medalla de PLATA",
        color: "text-slate-400",
        msg: "¡Muy bien! Tienes buen nivel.",
      };
    return {
      icon: <Medal size={80} className="text-orange-400 drop-shadow-lg" />,
      text: "Medalla de BRONCE",
      color: "text-orange-500",
      msg: "Sigue practicando para mejorar.",
    };
  };

  // --- VISTA: REGISTRO ---
  if (fase === "registro")
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-white font-sans">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-md w-full bg-slate-800 p-8 rounded-[40px] shadow-2xl border border-slate-700"
        >
          <div className="text-center mb-8">
            <BookOpen size={60} className="mx-auto text-blue-500 mb-4" />
            <h1 className="text-2xl font-black uppercase tracking-tight text-blue-100">
              Conociendo Mis Logros <span className="text-blue-500">2025</span>
            </h1>
            <p className="text-slate-400 mt-2 font-medium">
              Repaso 8° Grado - Ciencias Naturales
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 ml-4">
                NOMBRE COMPLETO
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={20}
                />
                <input
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-2xl p-4 pl-12 text-white focus:border-blue-500 outline-none transition-all"
                  placeholder="Ej. Carlos Hernández"
                  onChange={(e) => setUser({ ...user, nombre: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 ml-4">
                  GRADO
                </label>
                <div className="relative">
                  <School
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    size={20}
                  />
                  <input
                    className="w-full bg-slate-900/50 border border-slate-600 rounded-2xl p-4 pl-12 text-white focus:border-blue-500 outline-none transition-all"
                    placeholder="8°"
                    onChange={(e) =>
                      setUser({ ...user, grado: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 ml-4">
                  SECCIÓN
                </label>
                <input
                  className="w-full bg-slate-900/50 border border-slate-600 rounded-2xl p-4 text-center text-white focus:border-blue-500 outline-none transition-all"
                  placeholder="A"
                  onChange={(e) =>
                    setUser({ ...user, seccion: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <button
            onClick={() => setFase("juego")}
            disabled={!user.nombre || !user.grado}
            className="w-full mt-10 py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/50 flex items-center justify-center gap-2"
          >
            COMENZAR PRUEBA <ChevronRight size={20} />
          </button>
        </motion.div>
      </div>
    );

  // --- VISTA: RESULTADOS ---
  if (fase === "fin") {
    const totalRespondidas = Object.keys(respuestasUsuario).length;
    const aciertos = Object.values(respuestasUsuario).filter(
      (val) => val === true
    ).length;
    const medalData = getMedal();
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center font-sans">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-white p-12 rounded-[50px] shadow-2xl max-w-sm w-full border-t-[10px] border-blue-600"
        >
          <div className="mb-6 flex justify-center">{medalData.icon}</div>
          <h2
            className={`text-2xl font-black ${medalData.color} mb-2 uppercase`}
          >
            {medalData.text}
          </h2>
          <p className="text-slate-500 font-medium mb-8">{medalData.msg}</p>
          <div className="bg-slate-100 rounded-3xl p-6 mb-8">
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">
              Estudiante
            </p>
            <p className="text-slate-800 font-bold text-lg">{user.nombre}</p>
            <p className="text-slate-500 text-sm">
              {user.grado} "{user.seccion}"
            </p>
            <div className="mt-6 pt-6 border-t border-slate-200">
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">
                Resultado Final
              </p>
              <div className="flex justify-center items-baseline gap-1">
                <p className="text-5xl font-black text-slate-800">{aciertos}</p>
                <p className="text-xl text-slate-400 font-bold">
                  de {totalRespondidas}
                </p>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                (Preguntas contestadas)
              </p>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-slate-800 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-700"
          >
            <RefreshCw size={20} /> VOLVER A INTENTAR
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 flex justify-center items-start pt-10 font-sans relative">
      <AnimatePresence>
        {showNav && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/90 z-50 flex items-center justify-center p-6"
          >
            <div className="bg-white w-full max-w-lg rounded-[40px] p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-800">
                  Mapa de Preguntas
                </h2>
                <button
                  onClick={() => setShowNav(false)}
                  className="p-2 bg-slate-100 rounded-full hover:bg-slate-200"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="grid grid-cols-5 gap-3 mb-8">
                {BANCO_PREGUNTAS.map((p, index) => {
                  const estado = respuestasUsuario[index];
                  let colorClass =
                    "bg-slate-100 text-slate-500 border-slate-200";
                  if (estado === true)
                    colorClass =
                      "bg-green-100 text-green-700 border-green-300 font-bold";
                  if (estado === false)
                    colorClass =
                      "bg-red-100 text-red-700 border-red-300 font-bold";
                  if (index === idx) colorClass += " ring-2 ring-blue-500";
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setIdx(index);
                        setSubFase("educa");
                        setShowNav(false);
                      }}
                      className={`h-12 rounded-xl border-2 flex items-center justify-center text-sm transition-all ${colorClass}`}
                    >
                      {p.id}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setFase("fin")}
                className="w-full py-4 bg-red-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-600"
              >
                <Flag size={20} /> FINALIZAR PRUEBA AHORA
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-2xl w-full">
        <div className="bg-white p-4 rounded-3xl shadow-sm mb-6 flex justify-between items-center border border-slate-200">
          <button
            onClick={() => setShowNav(true)}
            className="flex flex-col items-center justify-center w-12 h-12 bg-slate-100 rounded-2xl text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <LayoutGrid size={20} />
            <span className="text-[9px] font-bold uppercase mt-1">Mapa</span>
          </button>
          <div className="text-center">
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
              Estudiante
            </p>
            <p className="font-bold text-slate-700 text-sm leading-none">
              {user.nombre}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Pregunta
            </p>
            <div className="flex items-center gap-1 justify-end">
              <span className="text-xl font-black text-blue-600">
                {idx + 1}
              </span>
              <span className="text-sm font-bold text-slate-300">
                / {BANCO_PREGUNTAS.length}
              </span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {subFase === "educa" ? (
            <motion.div
              key="educa"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              className="bg-white p-8 rounded-[40px] shadow-xl border-b-[8px] border-amber-400"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl">
                  <Lightbulb size={32} strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-800 leading-tight">
                    {item.titulo}
                  </h2>
                  <p className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                    Cápsula de Repaso
                  </p>
                </div>
              </div>
              <div className="text-lg text-slate-600 leading-relaxed mb-8 font-medium">
                "{item.aprendizaje}"
              </div>
              {item.tipo === "simulador_energia" && <EnergiaSim />}
              <button
                onClick={() => setSubFase("reto")}
                className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[25px] font-black text-lg shadow-xl shadow-blue-200 flex items-center justify-center gap-2 transition-all"
              >
                IR A LA PREGUNTA <ChevronRight strokeWidth={3} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="reto"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="bg-white p-8 rounded-[40px] shadow-xl border-t-[8px] border-blue-600"
            >
              <div className="mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg uppercase tracking-wide">
                  Pregunta {idx + 1}
                </span>
              </div>
              <p className="bg-slate-50 p-5 rounded-2xl mb-8 text-slate-600 font-medium italic border border-slate-100">
                "{item.contexto}"
              </p>
              <h3 className="text-2xl font-black text-slate-800 mb-8 leading-tight">
                {item.pregunta}
              </h3>
              <div className="space-y-3">
                {opciones.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(opt)}
                    disabled={seleccion !== null}
                    className={`w-full p-5 text-left rounded-3xl border-2 font-bold transition-all ${
                      seleccion === opt
                        ? opt === item.correcta
                          ? "bg-green-50 border-green-500 text-green-700"
                          : "bg-red-50 border-red-500 text-red-700"
                        : seleccion !== null && opt === item.correcta
                        ? "bg-green-50 border-green-200 text-green-600 opacity-100"
                        : "bg-white border-slate-100 text-slate-600 hover:border-blue-300 hover:bg-blue-50/50"
                    } ${
                      seleccion !== null &&
                      opt !== item.correcta &&
                      opt !== seleccion
                        ? "opacity-40"
                        : ""
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <AnimatePresence>
                {seleccion !== null && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="mt-8 overflow-hidden"
                  >
                    <div
                      className={`p-6 rounded-[30px] mb-6 flex gap-4 ${
                        seleccion === item.correcta
                          ? "bg-green-100 text-green-900"
                          : "bg-amber-100 text-amber-900"
                      }`}
                    >
                      <div className="shrink-0 mt-1">
                        {seleccion === item.correcta ? (
                          <CheckCircle2 size={28} />
                        ) : (
                          <AlertCircle size={28} />
                        )}
                      </div>
                      <div>
                        <p className="font-black text-lg">
                          {seleccion === item.correcta
                            ? "¡Respuesta Correcta!"
                            : "Pista de Ayuda"}
                        </p>
                        <p className="text-sm font-medium leading-snug mt-1 opacity-90">
                          {seleccion === item.correcta
                            ? "¡Dominas este tema perfectamente!"
                            : item.pista}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (idx < BANCO_PREGUNTAS.length - 1) {
                          setIdx(idx + 1);
                          setSubFase("educa");
                        } else {
                          setFase("fin");
                        }
                      }}
                      className="w-full py-5 bg-slate-800 text-white rounded-[25px] font-black text-lg shadow-xl flex items-center justify-center gap-2 hover:bg-slate-700"
                    >
                      {idx === BANCO_PREGUNTAS.length - 1
                        ? "VER RESULTADOS"
                        : "SIGUIENTE ÍTEM"}{" "}
                      <ChevronRight strokeWidth={3} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
