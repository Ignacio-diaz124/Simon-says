import PropTypes from 'prop-types';

export default function ButtonGame({ color, onClick }) {
    return <button className={color} onClick={onClick}></button>;
}

// Validación de las props
ButtonGame.propTypes = {
    color: PropTypes.string.isRequired,  // 'color' es requerida
    onClick: PropTypes.func,  // 'onClick' es opcional
};