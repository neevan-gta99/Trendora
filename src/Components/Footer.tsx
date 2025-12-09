function Footer() {
    return (
        <footer className="footer-wrapper">
            {/* Section 1: Logo + About */}
            <div className="footer-section">
                <h2 className="footer-title">Trendora</h2>
                <p className="footer-text">Your fashion destination for all categories.</p>
                <h3 className="footer-subtitle">About Us</h3>
                <p className="footer-text">We bring the best styles for Men, Women and Kids.</p>
            </div>

            {/* Section 2: Men's Links */}
            <div className="footer-section">
                <h3 className="footer-subtitle">Men's</h3>
                <ul className="footer-list">
                    <li><a href="/men-topwear">Top Wear</a></li>
                    <li><a href="/men-bottomwear">Bottom Wear</a></li>
                    <li><a href="/men-footwear">Footwear</a></li>
                </ul>
            </div>

            {/* Section 3: Women's Links */}
            <div className="footer-section">
                <h3 className="footer-subtitle">Women's</h3>
                <ul className="footer-list">
                    <li><a href="/women-ethnic">Ethnic</a></li>
                    <li><a href="/women-western">Western</a></li>
                    <li><a href="/women-footwear">Footwear</a></li>
                </ul>
            </div>

            {/* Section 4: Other Links */}
            <div className="footer-section">
                <h3 className="footer-subtitle">Other</h3>
                <ul className="footer-list">
                    <li><a href="/bags">Bags</a></li>
                    <li><a href="/suitcases">Suitcases</a></li>
                    <li><a href="/luggage">Luggage</a></li>
                </ul>
            </div>
        </footer>


    );
}

export default Footer;
