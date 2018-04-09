import React from 'react';

const date = new Date();

const Footer = () => (
    <footer className="footer container">
        <div className="row justify-content-between">
            <p className="col-auto">
                © <a href="https://github.com/fantua" target="_blank" rel="noopener noreferrer">Igor Machuzhak</a> {date.getFullYear()}
            </p>
            <p className="col-auto">
                <a href="http://itts.nung.edu.ua/" target="_blank" rel="noopener noreferrer">ITTC</a>
            </p>
        </div>
    </footer>
);

export default Footer;