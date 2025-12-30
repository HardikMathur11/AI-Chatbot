import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  addConversation,
  createChat,
  deleteChat,
  getAllChats,
  getConversation,
  renameChat,
} from "../controllers/chatControllers.js";

const router = express.Router();

router.post("/new", isAuth, createChat);
router.get("/all", isAuth, getAllChats);
router.post("/:id", isAuth, addConversation);
router.get("/:id", isAuth, getConversation);
router.delete("/:id", isAuth, deleteChat);
router.put("/:id", isAuth, renameChat);

export default router;
