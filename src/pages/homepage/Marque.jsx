import marquee1 from "../../assets/marqee/Marqee1.svg";
import marquee2 from "../../assets/marqee/Marqee2.svg";
import marquee3 from "../../assets/marqee/Marqee3.svg";
import marquee4 from "../../assets/marqee/Marqee4.svg";
import marquee5 from "../../assets/marqee/Marqee5.svg";

const Marquee = () => {
    const items = [
        { img: marquee1, text: "Exceptional Quality" },
        { img: marquee2, text: "Trusted by 100K+ Customers" },
        { img: marquee3, text: "Innovative & Durable Products" },
        { img: marquee4, text: "Unique, Registered Designs" },
        { img: marquee5, text: "More than 5150+ SKUs" },
        { img: marquee1, text: "Manufacturing Since 2003" },
        { img: marquee2, text: "5 years guarantee on selected products" },
        { img: marquee3, text: "Made In India" }
    ];

    // Duplicate the items for seamless looping
    const duplicatedItems = [...items, ...items, ...items];

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
        }}> 
            {/* Marquee track - triple duplicated for perfect looping */}
            <div style={{
                display: 'flex',
                gap: '50px',
                animation: 'marquee 35s linear infinite',
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

            {/* Smooth infinite animation */}
            <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
        </div>
    );
}

export default Marquee;

