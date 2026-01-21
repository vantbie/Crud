//array de prueba
const db = require("../data/db"); 

// Funcion para mostrar los temas
function getAllTopics(req, res) {
    db.all("SELECT * FROM topics ORDER BY votes DESC", [], (err, rows) => {
        if (err) throw err;
        res.render("topics", { topics: rows , editId: null });
    });

    //const sortedTopics = topics.sort((a,b) => b.votes - a.votes);
    //res.render("topics", { topics: sortedTopics }); 
}

// Crear un nuevo topic
function createTopic(req, res) {
    const { title } = req.body;
    db.run("INSERT INTO topics (title, votes) VALUES (?, 0)", [title], function(err) {
        if (err) throw err;
        res.redirect("/topics");
    });
    
    /*const newTopic = {
        id: topics.length + 1,
        title,
        votes: 0
    }
    topics.push(newTopic);
    res.redirect("/topics");*/
}

// votar un topic
function voteTopic(req, res){
    const id = parseInt(req.params.id);
    db.run("UPDATE topics SET votes = votes + 1 WHERE id = ?", [id], function(err) {
        if (err) {
            return res.status(500).json({ error: "Error al votar" });
        }

        db.get("SELECT votes FROM topics WHERE id = ?", [id], (err, row) => {
            if (err) return res.status(500).json({ error: "Error al obtener votos" });

            res.json({ votes: row.votes});
        });
    });
    
    /*const topic = topics.find(t => t.id === id);
    if(topic) {
        topic.votes += 1;
    }
    res.redirect("/topics");*/
}

// eliminar un topic
function deleteTopic(req, res){
    const id = parseInt(req.params.id);
    db.run("DELETE FROM topics WHERE id = ?", [id], function(err) {
        if (err) {
            return res.status(500).json({ error: "Error al eliminar" });
        }
        res.json({ message: "Eliminado correctamente", id: id });
    });
    
    //topics = topics.filter(t => t.id !== id);
    //res.redirect("/topics");
}

function editTopic(req, res){
    const id = parseInt(req.params.id);
    db.all("SELECT * FROM topics WHERE id = ?", [id], function(err, rows) {
        if (err) throw err;
        res.render("topics", { topics: rows, editId: id});
    });
}

function updateTopic(req, res){
    const id = parseInt(req.params.id);
    const { title } = req.body;
    db.run("UPDATE topics SET title = ? WHERE id = ?", [title, id], function(err) {
        if (err) {
            return res.status(500).json({ error: "Error al actualizar" });
        }
        // EN LUGAR DE REDIRECT, devolvemos el nuevo título para que JS lo pinte
        res.json({ message: "Actualizado", title: title });
    });
}


//exportamos la funcion
module.exports = { getAllTopics , createTopic, voteTopic, deleteTopic, editTopic, updateTopic};
