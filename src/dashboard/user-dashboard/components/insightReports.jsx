import "../styles/insightReports.css"

const InsightReports = () => {
    return(
        <>
        <label htmlFor="#" className="content-header">Past Reports</label>
        <div className="insight-reports-container">
            <div className="options">
                This is options menu
            </div>

            <div className="reports-list">
                <div className="report-header thead">
                    <span className="th">Report Id</span>
                    <span className="th">Farm Name</span>
                    <span className="th">Report type</span>
                    <span className="th">Generated on</span>
                    <span className="th">Actions</span>
                </div>
                <div className="reports">
                    <div className="report">
                        <div className="item">102</div>
                        <div className="item">Farm A</div>
                        <div className="item">Soil Insight</div>
                        <div className="item">01-05-22</div>
                        <div className="item action-btns">
                            <button className="view"><i className="bi bi-eye"></i></button>
                            <button className="download"><i className="bi bi-printer"></i></button>
                            <button className="remove"><i className="bi bi-trash3"></i></button>
                        </div>
                    </div>
                    <div className="report">
                        <div className="item">102</div>
                        <div className="item">Farm A</div>
                        <div className="item">Soil Insight</div>
                        <div className="item">01-05-22</div>
                        <div className="item action-btns">
                            <button className="view"><i className="bi bi-eye"></i></button>
                            <button className="download"><i className="bi bi-printer"></i></button>
                            <button className="remove"><i className="bi bi-trash3"></i></button>
                        </div>
                    </div>
                    <div className="report">
                        <div className="item">102</div>
                        <div className="item">Farm A</div>
                        <div className="item">Soil Insight</div>
                        <div className="item">01-05-22</div>
                        <div className="item action-btns">
                            <button className="view"><i className="bi bi-eye"></i></button>
                            <button className="download"><i className="bi bi-printer"></i></button>
                            <button className="remove"><i className="bi bi-trash3"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default InsightReports;