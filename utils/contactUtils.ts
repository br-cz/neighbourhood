export function handleContactChange(e: any, setFieldValue: any) {
    const { value } = e.target;
    const numericPhoneNumber = value.replace(/\D/g, '');
    const formattedPhoneNumber = numericPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    setFieldValue('contact', formattedPhoneNumber);
}
