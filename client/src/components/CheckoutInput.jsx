const CheckoutInput = ({ label, type = "text", name, value = "", min = null, placeholder = "" }) => {
    return (
        <div>
            <label>{label}</label>
            <input type={type} required name={name} defaultValue={value} min={min} placeholder={placeholder} />
        </div>
    );
}

export default CheckoutInput;