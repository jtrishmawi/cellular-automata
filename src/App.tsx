import { Form } from "@/components/form";
import { Sketch } from "@/components/sketch";

function App() {
  return (
    <div className="flex gap-4 justify-center items-center h-screen p-4">
      <Sketch />
      <Form />
    </div>
  );
}

export default App;
