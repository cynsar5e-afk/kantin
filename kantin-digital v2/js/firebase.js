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
    deskripsi: "Nasi goreng dengan telur, ayam, dan sayuran segar"
  },
  {
    id: "m2",
    nama: "Mie Ayam Bakso",
    harga: 7000,
    kategori: "Makanan",
    emoji: "🍜",
    img: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=300&q=80",
    deskripsi: "Mie kenyal dengan ayam cincang dan bakso sapi"
  },
  {
    id: "m3",
    nama: "Ayam Geprek",
    harga: 10000,
    kategori: "Makanan",
    emoji: "🍗",
    img: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=300&q=80",
    deskripsi: "Ayam goreng crispy diulek sambal bawang pedas"
  },
  {
    id: "m4",
    nama: "Indomie Goreng",
    harga: 5000,
    kategori: "Makanan",
    emoji: "🍝",
    img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=300&q=80",
    deskripsi: "Indomie goreng original dengan telur dan kerupuk"
  },
  {
    id: "m5",
    nama: "Es Teh Manis",
    harga: 3000,
    kategori: "Minuman",
    emoji: "🧋",
    img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&q=80",
    deskripsi: "Teh manis segar dengan es batu yang melimpah"
  },
  {
    id: "m6",
    nama: "Jus Jeruk",
    harga: 5000,
    kategori: "Minuman",
    emoji: "🍊",
    img: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&q=80",
    deskripsi: "Jeruk segar diperas langsung, tanpa pengawet"
  },
  {
    id: "m7",
    nama: "Gorengan Mix",
    harga: 3000,
    kategori: "Snack",
    emoji: "🧆",
    img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=300&q=80",
    deskripsi: "Tempe, tahu, dan bakwan goreng crispy (3 pcs)"
  },
  {
    id: "m8",
    nama: "Pisang Coklat",
    harga: 4000,
    kategori: "Snack",
    emoji: "🍫",
    img: "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=300&q=80",
    deskripsi: "Pisang bakar dengan topping coklat dan keju"
  }
];

// ─── DAFTAR KELAS ──────────────────────────────────────────────────────────────
export const DAFTAR_KELAS = [
  "X RPL 1", "X RPL 2", "X TKJ 1", "X TKJ 2",
  "XI RPL 1", "XI RPL 2", "XI TKJ 1", "XI TKJ 2",
  "XII RPL 1", "XII RPL 2", "XII TKJ 1", "XII TKJ 2"
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
