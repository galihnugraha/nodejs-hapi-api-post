// eslint-disable-next-line import/no-extraneous-dependencies
const { nanoid } = require('nanoid');
const notes = require('./notes');

const findNoteId = (findId) => notes.filter((note) => note.id === findId)[0];

const addNoteHandler = (request, h) => {
  const { title, tags, body } = JSON.parse(request.payload);

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const filterSameId = findNoteId(id);

  if (filterSameId !== undefined) {
    const responseSuccess = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    responseSuccess.code(201);
    return responseSuccess;
  }

  const responseFail = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });

  responseFail.code(500);
  return responseFail;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const findId = findNoteId(id);

  if (findId !== undefined) {
    return {
      status: 'success',
      data: {
        findId,
      },
    };
  }

  const responseFail = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });

  responseFail.code(404);
  return responseFail;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = JSON.parse(request.payload);

  const updatedAt = new Date().toISOString();

  const indexEditing = notes.findIndex((note) => note.id === id);

  if (indexEditing !== -1) {
    notes[indexEditing] = {
      ...notes[indexEditing],
      title,
      tags,
      body,
      updatedAt,
    };

    const responseSuccess = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    responseSuccess.code(200);
    return responseSuccess;
  }

  const responseFail = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  responseFail.code(404);
  return responseFail;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
};
