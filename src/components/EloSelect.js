import elos from '../constants/elos'

function EloSelect({ value, onChange }) {
    return (
        <select
            onChange={(event) => onChange(event.target.value)}
            value={value}
        >
            {elos.map((elo) => (
                <option value={elo.key}>{elo.label}</option>
            ))}
        </select>
    )
}

export default EloSelect
