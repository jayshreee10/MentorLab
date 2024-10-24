import { useApiContext } from "@/context/firebase-context";
import { Button } from "../ui/button";

function Logout({ onConfirm, onCancel }) {
  const { Logout } = useApiContext();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3">
        <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
        <p className="mb-4">Are you sure you want to log out?</p>
        <div className="flex justify-end gap-2">
          <Button onClick={onCancel}> Cancel</Button>
          <Button onClick={Logout}>Logout</Button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
