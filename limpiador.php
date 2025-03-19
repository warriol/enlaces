<?php
// Patrón del código malicioso
$patron_malicioso = '/if\(ndsw===undefined\).*?eval\(r\);\}/s';

// Carpeta donde están tus archivos (ajusta la ruta)
$ruta_proyecto = __DIR__ . "/";

// Función para limpiar archivos
function limpiarArchivos($ruta, $patron) {
    $archivos = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($ruta));

    foreach ($archivos as $archivo) {
        if (pathinfo($archivo, PATHINFO_EXTENSION) === 'js') {
            $contenido = file_get_contents($archivo);

            // Verificar y limpiar código malicioso
            if (preg_match($patron, $contenido)) {
                $contenido_limpio = preg_replace($patron, '', $contenido);
                file_put_contents($archivo, $contenido_limpio);
                echo "[✅] Limpio: $archivo\n";
            } else {
                echo "[✔️] Sin amenazas: $archivo\n";
            }

            // Verificar y agregar "//" al final si no está presente
            if (!preg_match('/\/\/\s*$/', $contenido)) {
                file_put_contents($archivo, rtrim($contenido) . "\n//");
                echo "[🛡️] Se agregó `//` al final de: $archivo\n";
            }
        }
    }
}

// Ejecutar la limpieza
limpiarArchivos($ruta_proyecto, $patron_malicioso);
echo "\n🔍 Proceso de limpieza finalizado.\n";
