import './Header.css'
import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Search({ isHomePage, isMobile = false }) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRef = useRef(null);
    const debounceTimer = useRef(null);

    const products = useSelector(state => state.products.data);

    const allProducts = products.filter(product => product.subcategories && product.subcategories.length > 0)
        .flatMap(category =>
            category.subcategories.flatMap(subcategory =>
                subcategory.products?.map(product => ({
                    ...product,
                    categoryName: category.name,
                    subcategoryName: subcategory.name,
                    categoryId: category.id
                })) || []
            )
        );

    // Debounced search function
    const performSearch = useCallback((query) => {
        if (query === "") {
            // Show all published products when search is empty
            const allPublishedProducts = allProducts.filter(product => product.ispublished);
            setSearchResults(allPublishedProducts.slice(0, 15));
            return;
        }

        const productResults = allProducts.filter(product => {
            if (!product.ispublished) return false;

            // Check name
            if (product.name.toLowerCase().includes(query)) return true;

            // Check filter
            if (product.filter && product.filter.toLowerCase().includes(query)) return true;

            // Check pagekeywords (split by comma and check each keyword)
            if (product.pagekeywords) {
                const keywords = product.pagekeywords.toLowerCase().split(',');
                return keywords.some(keyword => keyword.trim().includes(query));
            }

            return false;
        }).slice(0, 15);

        setSearchResults(productResults);
    }, [allProducts]);

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase().trim();
        setSearchQuery(query);

        // Clear previous timer
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        // Set new timer
        debounceTimer.current = setTimeout(() => {
            performSearch(query);
        }, 300); // 300ms debounce delay
    };

    const toggleSearch = () => {
        setIsSearchOpen(prev => !prev);
        if (!isSearchOpen) {
            setSearchQuery("");
            // Show all published products when opening search
            const allPublishedProducts = allProducts.filter(product => product.ispublished);
            setSearchResults(allPublishedProducts.slice(0, 15));
        } else {
            setSearchResults([]);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Clear debounce timer on submit
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }
        performSearch(searchQuery);
        console.log("Search submitted:", searchQuery);
    };

    const handleProductClick = (productId) => {
        navigate(`/catalog/${productId}`);
        setIsSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                const searchIcon = document.querySelector(isMobile ? '.mobile-search button' : '.search-container button');
                if (!searchIcon || !searchIcon.contains(event.target)) {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                    setSearchResults([]);
                }
            }
        };

        if (isSearchOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            // Clean up timer on unmount
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, [isSearchOpen, isMobile]);

    const renderSearchResults = () => {
        // Filter to only show published products in all cases
        const publishedResults = searchResults.filter(product => product.ispublished);

        return (
            <div className="search-results-container">
                {publishedResults.length > 0 ? (
                    <div className="search-results-section">
                        {publishedResults.map(product => (
                            <div
                                key={product.id}
                                className="search-result-item"
                                onClick={() => handleProductClick(product.id)}
                            >
                                <img
                                    src={product.mainimage || product.imagelink || 'https://via.placeholder.com/50'}
                                    alt={product.name}
                                    className="search-result-image"
                                />
                                <span className="search-result-name">{product.name}</span>
                            </div>
                        ))}
                    </div>
                ) : searchQuery.trim() !== "" && (
                    <div className="search-no-results">
                        No published products found for "{searchQuery}"
                    </div>
                )}
            </div>
        );
    };

    if (isMobile) {
        return (
            <>
                <button
                    className={`icon-button ${isHomePage ? 'search-icon-home' : 'search-icon-other'}`}
                    onClick={toggleSearch}
                >
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="icon"
                        style={{ color: isHomePage ? '#D67A1D' : 'black' }}
                    />
                </button>

                {isSearchOpen && (
                    <div className={`mobile-search-expanded ${isHomePage ? 'home-route' : 'other-route'}`} ref={searchRef}>
                        <form onSubmit={handleSearchSubmit} className="mobile-search-form-expanded">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onFocus={() => {
                                    if (searchQuery.trim() === "") {
                                        const allPublishedProducts = allProducts.filter(product => product.ispublished);
                                        setSearchResults(allPublishedProducts.slice(0, 15));
                                    }
                                }}
                                placeholder="Search for products..."
                                className="mobile-search-input-expanded"
                                autoFocus
                            />
                            <button type="submit" className="search-icon-container-expanded">
                                <FontAwesomeIcon
                                    icon={faMagnifyingGlass}
                                    className="icon"
                                    style={{ color: isHomePage ? 'white' : '#D67A1D' }}
                                />
                            </button>
                            {renderSearchResults()}
                        </form>
                    </div>
                )}
            </>
        );
    }

    return (
        <div className="search-container" ref={searchRef}>
            <button
                className={`icon-button ${isHomePage ? 'search-icon-home' : 'search-icon-other'}`}
                onClick={toggleSearch}
            >
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="icon"
                    style={{ color: isHomePage ? '#D67A1D' : 'black' }}
                />
            </button>

            {isSearchOpen && (
                <div className={`search-form-container ${isHomePage ? 'home-route' : 'other-route'}`}>
                    <form onSubmit={handleSearchSubmit} className="search-form">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search for products..."
                            className="search-input"
                            autoFocus
                        />
                        <button type="submit" className="search-icon-container">
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                className="icon"
                                style={{ color: isHomePage ? 'white' : '#D67A1D' }}
                            />
                        </button>
                    </form>
                    {renderSearchResults()}
                </div>
            )}
        </div>
    );
}

export default Search;