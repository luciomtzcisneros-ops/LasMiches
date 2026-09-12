// Cargar XML y pintar la lista de ingredientes
fetch('receta.xml')
    .then(response => {
        if (!response.ok) throw new Error('No se pudo cargar el XML');
        return response.text();
    })
    .then(str => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(str, 'application/xml');
        const ingredientes = xml.querySelectorAll('ingrediente');
        const lista = document.getElementById('lista-ingredientes');

        ingredientes.forEach(ing => {
            const li = document.createElement('li');
            const unidad = ing.getAttribute('unidad') || '';
            li.textContent = `${ing.textContent} (${unidad})`;
            lista.appendChild(li);
        });
    })
    .catch(err => {
        console.error(err);
        document.getElementById('lista-ingredientes').innerHTML =
            '<li>⚠ No se pudo cargar el XML. Revisa la ruta.</li>';
    });