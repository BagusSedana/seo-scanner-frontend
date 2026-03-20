// src/components/NavbarWrapper.tsx
"use client";

import Navbar from "./Navbar";

export default function NavbarWrapper() {
   // Landing page punya navbar sendiri, skip global navbar
   return <Navbar />;
}
