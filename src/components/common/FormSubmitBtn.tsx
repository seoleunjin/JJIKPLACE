import styles from "@/styles/common.module.css";
interface FormSubmitBtnProps {
  title: string;
}
function FormSubmitBtn({ title }: FormSubmitBtnProps) {
  return (
    <div className={styles.formSubmitBtn}>
      <button type="submit">{title}</button>
    </div>
  );
}

export default FormSubmitBtn;
