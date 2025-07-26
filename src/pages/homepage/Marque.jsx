import marquee1 from "../../assets/marqee/Exceptional Quality.svg";
import marquee2 from "../../assets/marqee/Trusted by 100K+ Customers.svg";
import marquee3 from "../../assets/marqee/Innovative & Durable Products.svg";
import marquee4 from "../../assets/marqee/Unique, Registered Designs.svg";
import marquee5 from "../../assets/marqee/More than 5150+ SKUs,.svg";
import marquee6 from "../../assets/marqee/Manufacturing Since 2003.svg";
import marquee7 from "../../assets/marqee/5 years guarantee on selected products.svg";
import marquee8 from "../../assets/marqee/Made In India.svg";

const Marquee = () => {
    const items = [
        { img: marquee1, text: "Exceptional Quality" },
        { img: marquee2, text: "Trusted by 100K+ Customers" },
        { img: marquee3, text: "Innovative & Durable Products" },
        { img: marquee4, text: "Unique, Registered Designs" },
        { img: marquee5, text: "More than 5150+ SKUs" },
        { img: marquee6, text: "Manufacturing Since 2003" },
        { img: marquee7, text: "5 years guarantee on selected products" },
        { img: marquee8, text: "Made In India" }
    ];

    // Duplicate the items array multiple times to ensure smooth looping
    const duplicatedItems = [...items, ...items, ...items, ...items, ...items];

    return (
        <div style={{
            fontFamily: 'Inter',
            padding: '45px 0',
            width: '100%',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            position: 'relative',
            borderBottom: '1px solid #0000004D',
        }}>
            {/* Marquee track - triple duplicated for perfect looping */}
            <div style={{
                display: 'flex',
                gap: '50px',
                animation: 'marquee 62s linear infinite',
                willChange: 'transform' // Optimize for performance
            }}>
                {duplicatedItems.map((item, index) => (
                    <div
                        key={`${index}-${item.text}`}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            flexShrink: 0,
                            paddingRight: '14px' // Additional spacing
                        }}
                    >
                        <img
                            src={item.img}
                            alt=""
                            style={{
                                width: '32px',
                                height: '32px',
                                display: 'block'
                            }}
                        />
                        <span style={{
                            whiteSpace: 'nowrap',
                            fontSize: '16px',
                            fontWeight: 400,
                            color: '#000' // Better contrast
                        }}>
                            {item.text}
                        </span>
                    </div>
                ))}
            </div>

            {/* Add CSS animation */}
            <style>{`
                @keyframes marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
        </div>
    );
};

export default Marquee;