import React from "react";
import { SelectPhoneApp } from "./src/ex1/SelectPhoneApp";
import { PHONES } from "./src/data/phone";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { BottomTabApp } from "./src/ex3/BottomTabApp";
import { StackTabApp } from "./src/ex4/StackTabApp";
import { DrawerApp } from "./src/ex5/DrawerApp";

export default function App() {
  // return <SelectPhoneApp phone={PHONES[0]} />;
  // return <SelectPhoneApi />;
  return <DrawerApp />;
} 