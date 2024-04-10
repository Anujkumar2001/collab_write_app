import { File } from "../models/file.model.js";

const createFile = async (req, res) => {
  const { name, content, user, createdBy } = req.body;

  const response = await File.create({
    name,
    content,
    users: [user],
    createdBy,
  });
  return res.status(201).json(response);
};

const updateFile = async (req, res) => {
  const { name, content, fileId } = req.body;
  const response = await File.findByIdAndUpdate(fileId, { name, content });
  return res.status(200).json(response);
};

const getAllFile = async (req, res) => {
  const allFiles = await File.find();
  return res.status(200).json(allFiles);
};

const getFileById = async (req, res) => {
  const { fileId } = req.body;
  const files = await File.findOne({ _id: fileId });
  return res.status(200).json(files);
};

const getUserAllFileById = async (req, res) => {
  const userId = req.userId;
  const files = await File.find({ users: userId });

  return res.status(200).json(files);
};

const shareFileToUser = async (req, res) => {
  const { fileId, userId } = req.body;

  let getFile = await File.findById(fileId);
  getFile.users.push(userId);
  getFile.shared = "*";

  const updatedFile = await getFile.save();

  return res.status(200).json(updatedFile);
};

export {
  createFile,
  updateFile,
  getAllFile,
  getFileById,
  getUserAllFileById,
  shareFileToUser,
};
