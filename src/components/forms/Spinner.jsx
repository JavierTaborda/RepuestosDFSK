export default function Spinner() {

    return (
        <>
            <div className="d-flex justify-content-center  m-5">
                <div className="spinner-border text-danger p-2" style={{ width: '3rem', height: '3rem' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}

