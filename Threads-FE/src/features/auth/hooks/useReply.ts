import { ThreadCard } from "@/features/thread";
import { IReplyPost } from "@/interface/reply";
import { API } from "@/lib/api";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useParams } from "react-router-dom";

export function useReply() {
  const { id } = useParams();
  const [Threads, setThread] = useState<ThreadCard>();
  const [replies, setReplies] = useState<ThreadCard[]>([]);
  const totalComments = replies.length;

  const [form, setForm] = useState<IReplyPost>({
    content: "",
    thread_id: +(id as string),
  });

  async function handlePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await API.post("/reply", form);
      setForm({
        content: "",
        thread_id: +(id as string),
      });
      console.log("berhasil menambahkan reply", response.data);
      getReplies();
    } catch (err) {
      console.log("gagal menambhkan reply", err);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  async function getThreadById() {
    try {
      const response = await API.get(`/threads/${id}`);
      setThread(response.data);
      console.log("berhasil mendapatkan thread", response.data);
    } catch (err) {
      console.log("gagal mendapatkan thread", err);
    }
  }

  async function getReplies() {
    try {
      const response = await API.get(`/replies?threadId=${id}`);
      setReplies(response.data);
      console.log("ini reply thread", response.data);
    } catch (err) {
      console.log("gagal mendapatkan replies data by id", err);
    }
  }

  useEffect(() => {
    getThreadById();
    getReplies();
  }, []);

  return {
    Threads,
    replies,
    totalComments,
    form,
    handleChange,
    handlePost,
    getThreadById,
    getReplies,
  };
}
