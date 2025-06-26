import commonStyles from "@/styles/common.module.css";
interface FormSubmitBtnProps {
  title: string;
  disabled?: boolean;
}

function FormSubmitBtn({ title, disabled = false }: FormSubmitBtnProps) {
  return (
    <div
      className={`${commonStyles.formSubmitBtn} ${
        disabled ? commonStyles.formSubmitBtn : commonStyles.formSubmitBtnActive
      }`}
    >
      <button type="submit" disabled={disabled}>
        {title}
      </button>
    </div>
  );
}

export default FormSubmitBtn;
