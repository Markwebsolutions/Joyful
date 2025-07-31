import React from 'react';
import {
    FacebookShareButton,
    FacebookMessengerShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    FacebookIcon,
    FacebookMessengerIcon,
    TwitterIcon,
    TelegramIcon,
    WhatsappIcon,
    LinkedinIcon,
    PinterestIcon
} from 'react-share';
import "./ProductDetails.css";

const SocialShare = ({
    url,
    title,
    description,
    image, // Add image prop for Pinterest
    facebookAppId = 'YOUR_FACEBOOK_APP_ID'
}) => {
    // Format the share text with proper line breaks
    const formatShareText = () => {
        return `${title}\n\n${description}`;
    };

    // For Twitter/X with character limit
    const formatTwitterText = () => {
        const maxLength = 280 - 23; // Twitter shortens URLs to ~23 characters
        let text = `${title}\n\n${description}`;

        if (text.length > maxLength) {
            text = `${text.substring(0, maxLength - 1)}…`;
        }

        return text;
    };

    return (
        <div className="social-share">
            <span>Share :</span>
            <div className="social-icons">
                {/* Facebook */}
                <FacebookShareButton
                    url={url}
                    quote={formatShareText()}
                    hashtag="#product"
                >
                    <FacebookIcon size={25} round className="social-icon" />
                </FacebookShareButton>

                {/* Facebook Messenger */}
                <FacebookMessengerShareButton
                    url={url}
                    appId={facebookAppId}
                    title={title}
                    message={formatShareText()}
                >
                    <FacebookMessengerIcon size={25} round className="social-icon" />
                </FacebookMessengerShareButton>

                {/* X (Twitter) */}
                <TwitterShareButton
                    url={url}
                    title={formatTwitterText()}
                    via="YourStoreName"
                    hashtags={['product', 'shopping']}
                >
                    <TwitterIcon size={25} round className="social-icon" />
                </TwitterShareButton>

                {/* Telegram */}
                <TelegramShareButton
                    url={url}
                    title={title}
                    text={formatShareText()}
                >
                    <TelegramIcon size={25} round className="social-icon" />
                </TelegramShareButton>

                {/* WhatsApp */}
                <WhatsappShareButton
                    url={url}
                    title={formatShareText()}
                >
                    <WhatsappIcon size={25} round className="social-icon" />
                </WhatsappShareButton>

                {/* LinkedIn */}
                <LinkedinShareButton
                    url={url}
                    title={title}
                    summary={description}
                    source="Your Store Name"
                >
                    <LinkedinIcon size={25} round className="social-icon" />
                </LinkedinShareButton>

                {/* Pinterest */}
                <PinterestShareButton
                    url={url}
                    media={image}
                    description={`${title}\n\n${description}`}
                >
                    <PinterestIcon size={25} round className="social-icon" />
                </PinterestShareButton>
            </div>
        </div>
    );
};

export default SocialShare;  