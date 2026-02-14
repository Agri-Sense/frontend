import "../styles/alert.css"

const Alerts = () => {
    return(
        <>
        <div className="alert-system">
            <label className="internal-div-headers">Critical Alerts</label>
            <div className="alerts">
                <div className="alert">
                    <span className="alert-header">
                        <p className="farm-name text-muted">Field</p>
                        <p className="interpunct text-muted">·</p>
                        <small className="generatedAt text-muted">20 min</small>
                    </span>
                    <span className="alert-description">Water Supply in field stopped due to Power cut. Turn on the inverter.</span>
                    <span className="action-btns">
                        <button className="handleAlertBtn">Call Tanker</button>
                    </span>
                </div>
                <div className="alert">
                    <span className="alert-header">
                        <p className="farm-name text-muted">Field</p>
                        <p className="interpunct text-muted">·</p>
                        <small className="generatedAt text-muted">20 min</small>
                    </span>
                    <span className="alert-description">Water Supply in field stopped due to Power cut. Turn on the inverter.</span>
                    <span className="action-btns">
                        <button className="handleAlertBtn">Call Tanker</button>
                    </span>
                </div>
                <div className="alert">
                    <span className="alert-header">
                        <p className="farm-name text-muted">Field</p>
                        <p className="interpunct text-muted">·</p>
                        <small className="generatedAt text-muted">20 min</small>
                    </span>
                    <span className="alert-description">Water Supply in field stopped due to Power cut. Turn on the inverter.</span>
                    <span className="action-btns">
                        <button className="handleAlertBtn">Call Tanker</button>
                    </span>
                </div>
            </div>
        </div>
        </>
    )
}

export default Alerts;