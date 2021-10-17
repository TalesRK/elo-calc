import { useState } from 'react'

import './Home.css'
import EloSelect from '../../components/EloSelect'
import elos from '../../constants/elos'
import logo from '../../static/logo.svg'
import plus from '../../static/plus-square.svg'
import github from '../../static/github.svg'
import close from '../../static/x.svg'

const INITIAL_RESULT = elos[0]

function Home() {
    const [selectedElos, setSelectedElos] = useState([
        'PROVISIONAL',
        'PROVISIONAL',
    ])

    function renderSelectedElos() {
        return (
            <>
                {selectedElos.map((elo, index) =>
                    renderSelectedElo(elo, index)
                )}
            </>
        )
    }

    function renderSelectedElo(key, index) {
        const eloData = mapEloByKey(key)
        return (
            <div className="player-elo">
                <img src={eloData.image} className="elo-images" alt="logo" />
                <span>{eloData.label}</span>
                <EloSelect
                    value={key}
                    onChange={(value) => handleEloChange(value, index)}
                />
            </div>
        )
    }

    function handleEloChange(key, index) {
        const nextSelectedElos = [...selectedElos]
        nextSelectedElos[index] = key
        setSelectedElos(nextSelectedElos)
    }

    function mapEloByKey(key) {
        return elos.find((item) => item.key === key)
    }

    function renderEloCalcResult() {
        const calculatedElo = generateEloCalcResult()
        return (
            <div className="result-elo">
                <span>Resultado:</span>
                <img
                    src={calculatedElo.image}
                    className="elo-image"
                    alt="logo"
                />
                <span>{calculatedElo.label}</span>
            </div>
        )
    }

    function generateEloCalcResult() {
        const selectedElosQuantity = selectedElos.length
        const selectedElosValuesSummarized = selectedElos
            .map((elo) => mapEloByKey(elo).value)
            .reduce((a, b) => a + b)

        const result = Math.floor(
            selectedElosValuesSummarized / selectedElosQuantity
        )

        return elos.find((elo) => elo.value === result)
    }

    function addNewEloForSelection() {
        const nextSelectedElos = [...selectedElos]
        nextSelectedElos.push(elos[0].key)
        setSelectedElos(nextSelectedElos)
    }

    return (
        <div className="home">
            <div className="logo-display">
                <div className="logo">
                    <img src={logo} className="logo-image" alt="logo" />
                </div>
                <div className="title">
                    <span>EloCalc</span>
                </div>
            </div>
            <div className="elo-result">{renderEloCalcResult()}</div>

            <div className="elo-select">
                {renderSelectedElos()}
                <div
                    className="player-elo"
                    onClick={() => addNewEloForSelection()}
                >
                    <img src={plus} className="elo-image" alt="logo" />
                </div>
            </div>
        </div>
    )
}

export default Home
