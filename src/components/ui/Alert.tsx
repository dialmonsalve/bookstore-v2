import { useUisStore } from "@/store/ui";

export const Alert = () => {
  const showAlert = useUisStore((state) => state.showAlert);
  const alertType = useUisStore((state) => state.alertType);
  const alertMessage = useUisStore((state) => state.alertMessage);

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
