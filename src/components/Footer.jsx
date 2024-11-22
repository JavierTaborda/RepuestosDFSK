import React from 'react';

export default function Footer() {
    return (
        <footer className="container-fluid bg-light text-dark py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 d-flex align-items-center">
                        <span className="mb-3 mb-md-0 text-muted">© 2024 MeruQ</span>
                    </div>
                    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li className="ms-3">
                            <a className="text-muted" href="https://www.dfskvenezuela.com/">
                                <i className="bi bi-browser-chrome"></i>
                            </a>
                        </li>
                        <li className="ms-3">
                            <a className="text-muted" href="https://www.instagram.com/dfskve/">
                                <i className="bi bi-instagram"></i>
                            </a>
                        </li>
                        <li className="ms-3">
                            <a className="text-muted" href="https://facebook.com/dfskvenezuela">
                                <i className="bi bi-facebook"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
