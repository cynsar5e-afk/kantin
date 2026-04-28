// firebase.js — Inisialisasi Firebase & helper functions

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Init Firebase
const app = initializeApp(window.FIREBASE_CONFIG);
const db = getFirestore(app);

// ─── MENU DATA (edit di sini untuk tambah/hapus menu) ─────────────────────────
export const MENU_ITEMS = [
  {
    id: "m1",
    nama: "Nasi Goreng Spesial",
    harga: 8000,
    kategori: "Makanan",
    emoji: "🍳",
    img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&q=80",
  },
  {
    id: "m2",
    nama: "Mie Ayam Bakso",
    harga: 10000,
    kategori: "Makanan",
    emoji: "🍜",
    img: "https://iili.io/Be1O9m7.jpg",
  },
  {
    id: "m3",
    nama: "Ayam Geprek",
    harga: 10000,
    kategori: "Makanan",
    emoji: "🍗",
    img: "https://i.ibb.co.com/M5y7xSGd/8ecd9ba6-0914-4d14-a05d-1cb21f5618ce.jpg",
  },
  {
    id: "m4",
    nama: "Indomie Goreng",
    harga: 5000,
    kategori: "Makanan",
    emoji: "🍝",
    img: "https://files.catbox.moe/o0d8tf.jpeg",
  },
  {
    id: "m5",
    nama: "Es Teh Manis",
    harga: 3000,
    kategori: "Minuman",
    emoji: "🧋",
    img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&q=80",
  },
  {
    id: "m6",
    nama: "Jus Jeruk",
    harga: 5000,
    kategori: "Minuman",
    emoji: "🍊",
    img: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&q=80",
  },
  {
    id: "m7",
    nama: "Gorengan Mix",
    harga: 2000,
    kategori: "Snack",
    emoji: "🧆",
    img: "https://i.ibb.co.com/7NXCMBcD/Gorengan-terbaik.jpg",
  },
  {
    id: "m8",
    nama: "Pisang Coklat",
    harga: 4000,
    kategori: "Snack",
    emoji: "🍫",
    img: "https://i.ibb.co.com/rG6Xcs1n/photo-1.jpg",
  }
];

// ─── DAFTAR KELAS ──────────────────────────────────────────────────────────────
export const DAFTAR_KELAS = [
  "X 1", "X 2", "X 3", "X 4",
  "X 5", "X 6", "X 7", "X 8",
  "XI 1", "XI 2", "XI 3", "XI 4"
];

// ─── ADMIN CONFIG ──────────────────────────────────────────────────────────────
export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "kantin123"
};

// ─── ORDER FUNCTIONS ───────────────────────────────────────────────────────────
export async function createOrder(orderData) {
  const docRef = await addDoc(collection(db, "orders"), {
    ...orderData,
    status: "waiting_payment",
    createdAt: serverTimestamp()
  });
  return docRef.id;
}

export async function updateOrderStatus(orderId, status) {
  const orderRef = doc(db, "orders", orderId);
  await updateDoc(orderRef, {
    status,
    [`${status}At`]: serverTimestamp()
  });
}

export async function getOrder(orderId) {
  const orderRef = doc(db, "orders", orderId);
  const snap = await getDoc(orderRef);
  if (snap.exists()) return { id: snap.id, ...snap.data() };
  return null;
}

export function listenToOrder(orderId, callback) {
  return onSnapshot(doc(db, "orders", orderId), (snap) => {
    if (snap.exists()) callback({ id: snap.id, ...snap.data() });
  });
}

export function listenToAllOrders(callback) {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    const orders = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(orders);
  });
}

export async function deleteOrder(orderId) {
  const orderRef = doc(db, "orders", orderId);
  await deleteDoc(orderRef);
}

export { db };
