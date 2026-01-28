const Topic = require('../models/topic.model');

//const db = require("../data/db"); 

// Funcion para mostrar los temas
async function getAllTopics(req, res) {
    try {
        // "Topic, encuéntralos todos"
        const topics = await Topic.findAll();
        
        // Enviamos los datos a la vista (EJS)
        res.render('topics', { topics: topics });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los temas");
    }

}

// Crear un nuevo topic
async function createTopic(req, res) {
    try {
        // Sacamos los datos del formulario
        const { title } = req.body;

        // "Topic, crea uno nuevo con estos datos"
        await Topic.create({ title });

        // Al terminar, recargamos la página principal
        res.redirect('/topics');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al crear el tema");
    }
    
}

// votar un topic
async function voteTopic(req, res){
    try {
        const { id } = req.params;

        // Buscar el tema por su ID 
        const topic = await Topic.findByPk(id);

        if (!topic) return res.status(404).json({ error: "No encontrado" });

        // Sumar voto y guardar
        await topic.increment('votes'); 

        // Recargamos para devolver el valor actualizado
        await topic.reload();

        res.json({ votes: topic.votes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al votar" });
    }
    
}

// eliminar un topic
async function deleteTopic(req, res){
    try {
        const { id } = req.params;
        await Topic.destroy({
            where: { id: id }
        });

        res.json({ message: "Eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar" });
    }
}

// editar
async function editTopic(req, res){
    try {
        const { id } = req.params;
        
        const topic = await Topic.findByPk(id);
        
        if (!topic) return res.redirect('/topics');

        res.render('edit', { topic });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al cargar formulario");
    }
}

//guardar
async function updateTopic(req, res){
    try {
        const { id } = req.params;
        const { title } = req.body;

        // SQL: UPDATE Topics SET title=?, author=? WHERE id=?
        await Topic.update(
            { title: title },
            { where: { id: id } } // A quién cambiar
        );

        res.json({ title: title, message: "Actualizado" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al actualizar");
    }
}


//exportamos la funcion
module.exports = { getAllTopics , createTopic, voteTopic, deleteTopic, editTopic, updateTopic};
