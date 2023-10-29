import { useUIStore } from "@/stores/ui/ui.store";

export const Alert = () => {
  const showAlert = useUIStore((state) => state.showAlert);
  const alertType = useUIStore((state) => state.alertType);
  const alertMessage = useUIStore((state) => state.alertMessage);

  return (
    <div
      className={`alert ${showAlert ? "show-alert" : "hide-alert"} ${
        alertType === "success" ? "success" : "error"
      } `}
    >
      <p className="alert__messenger">{alertMessage}</p>
    </div>
  );
};
