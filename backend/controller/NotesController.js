import Notes from "../models.js/NotesModel.js";

// GET (Ngambil Data)
async function getNotes(req, res) {
  try {
    const result = await Notes.findAll();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
  }
}

export const getNoteById = async(req, res) =>{
  try {
      const response = await Notes.findOne({
          where:{
              id: req.params.id
          }
      });
      res.status(200).json(response);
  } catch (error) {
      console.log(error.message);
  }
}

// CREATE
async function createNotes(req, res) {
  try {
    const inputResult = req.body;
    const result = await Notes.create(inputResult);
    return res.status(201).json(result);
  } catch (error) {
    console.log(error.message);
  }
}

async function updateNotes(req, res) {
  try {
    const { id } = req.params;
    const inputResult = req.body;

    const note  = await Notes.findByPk(id);
    console.log(Notes);
    if (!Notes) {
      return res.status(404).json({ msg: "Notes not found!" });
    }

    await Notes.update(inputResult, {
      where: { id: req.params.id },
    });
    return res.status(201).json({ msg: "Notes Updated" });
  } catch (error) {
    console.log(error.message);
  }
}

async function deleteNotes(req, res) {
  try {
    const { id } = req.params;

    const note = await Notes.findByPk(id);
    if (!Notes) {
      return res.status(404).json({ msg: "Notes not found!" });
    }

    await Notes.destroy({ where: { id } });
    return res.status(201).json({ msg: "Notes Deleted" });
  } catch (error) {
    console.log(error.message);
  }
}

export { getNotes, createNotes, updateNotes, deleteNotes };
