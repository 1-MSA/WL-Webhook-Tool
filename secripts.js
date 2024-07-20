let lastSent = 0;

async function sendEmbed() {
    const now = new Date().getTime();
    if (now - lastSent < 5000) {
        alert('Please wait 5 seconds before sending another embed.');
        return;
    }

    const webhookUrl = document.getElementById('webhookUrl').value;
    const author = document.getElementById('author').value;
    const body = document.getElementById('body').value;
    const bodyColor = document.getElementById('bodyColor').value;
    const fieldName = document.getElementById('fieldName').value;
    const fieldValue = document.getElementById('fieldValue').value;
    const thumbnailUrl = document.getElementById('thumbnailUrl').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const footer = document.getElementById('footer').value;

    if (!webhookUrl) {
        alert('Please enter the Webhook URL.');
        return;
    }

    const embed = {
        author: {
            name: author
        },
        description: body,
        color: parseInt(bodyColor.replace("#", ""), 16),
        fields: fieldName ? [{
            name: fieldName,
            value: fieldValue
        }] : [],
        thumbnail: {
            url: thumbnailUrl
        },
        image: {
            url: imageUrl
        },
        footer: {
            text: footer
        }
    };

    const payload = JSON.stringify({
        embeds: [embed]
    });

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload
        });

        if (response.ok) {
            alert('Embed sent successfully!');
            lastSent = now;
        } else {
            alert('Failed to send embed.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error sending embed.');
    }
}