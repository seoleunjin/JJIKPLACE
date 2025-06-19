import styles from "@/styles/common.module.css";
interface FormSubmitBtnProps {
  title: string;
  disabled?: boolean;
}
function FormSubmitBtn({ title, disabled = false }: FormSubmitBtnProps) {
  return (
    <div
      className={`${styles.formSubmitBtn} ${
        disabled ? styles.formSubmitBtn : styles.formSubmitBtnActive
      }`}
    >
      <button type="submit" disabled={disabled}>
        {title}
      </button>
    </div>
  );
}

export default FormSubmitBtn;
