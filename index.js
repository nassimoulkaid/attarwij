document.getElementById("init").addEventListener("click", toggleChatBot);
var cbot = document.getElementById("chat-box");
var chatContainer = document.getElementById('test');
var body = document.getElementById("content"); // Select body


function toggleChatBot() {
    if (chatContainer.style.display === 'block') {
        closeChat();
    } else {
        openChat();
    }
}

function openChat() {
    chatContainer.classList.remove('hide');
    chatContainer.classList.add('show');
    chatContainer.style.display = 'block';
    document.getElementById('init').innerText = 'CLOSE CHAT';
    body.classList.add('blurred');  // Ajouter l'effet de flou au body
    initChat();
}

function closeChat() {
    chatContainer.classList.remove('show');
    chatContainer.classList.add('hide');
    setTimeout(() => {
        chatContainer.style.display = 'none';
        body.classList.remove('blurred');  // Retirer l'effet de flou du body
        var spanElement = document.createElement('span');
        spanElement.innerHTML = `
            <img src="images/chatbot.png" alt="Chatbot Image" style="vertical-align: middle; margin-right: 10px;">
            <span>bonjour comment je l'aider !</span>
        `;
        document.getElementById('init').innerHTML = '';
        document.getElementById('init').appendChild(spanElement);
    }, 500);
}


var data = {
    chatinit: {
        title: ["Hello <span class='emoji'> &#128075;</span>", "je suis M. Chatbot", "bonjour comment je l'aider"],
        options: ["Description de l'entreprise", "Nos services", "le service prospection", "Contactez-nous"]
    },
    "description de l'entreprise": {
        title: [
            "Chez Attarwij Agency, la satisfaction de nos clients est notre priorité absolue.",
            "Nous travaillons en étroite collaboration avec vous pour comprendre vos besoins spécifiques et développer des stratégies qui correspondent parfaitement à votre marque et à votre public cible.",
            "Faites le choix de la réussite en ligne avec Attarwij Agency. Contactez-nous dès aujourd'hui pour discuter de la façon dont nous pouvons faire croître votre entreprise ensemble! 🌟"
        ],
        options: ["Retour"]
    },
    "nos services": {
        title: ["Nos Services", "Découvrez comment nous pouvons vous aider"],
        options: ["centre d’appel", "marketing digital", "ventes", "création de site web", "création de contenu", "retour"]
    },
    "le service prospection": {
        title: ["Contactez le service prospection", "Nous sommes là pour répondre à vos questions"],
        options: ["Par téléphone 📞", "Par email 📧", "Par visite 🏢", "Retour"]
    },
    "contactez-nous": {
        title: ["Contactez-nous pour plus d'informations", "Nous sommes là pour vous aider"],
        options: ["Par téléphone 📞", "Par email 📧", "Par visite 🏢", "Retour"]
    },
    "par téléphone 📞": {
        title: ["Vous pouvez nous appeler au numéro suivant : +2127 81456887 📞"],
        options: ["Retour"]
    },
    "par email 📧": {
        title: ["Vous pouvez nous envoyer un email à : attarwijagency@gmail.com 📧"],
        options: ["Retour"]
    },
    "par visite 🏢": {
        title: ["Vous pouvez nous rendre visite à notre adresse : N195 quartier el mansour,Meknes 50000 🏢"],
        options: ["Retour"]
    },
    "centre d’appel": {
        title: ["nous offrons des services de centre d'appel pour gérer vos communications avec les clients de manière professionnelle et efficace. Que ce soit pour le support client, la prise de commandes, ou des campagnes de télémarketing, notre équipe est formée pour répondre à vos besoins spécifiques"],
        options: [
            "centre d'appel avec support client 24/7", 
            "confirmation téléphonique", 
            "suivi personnalisé", 
            "assistance multilingue", 
            "suivi des appels et analyse des données", 
            "gestion des appels entrants et sortants", 
            "réponse rapide et personnalisée", 
            "retour"
        ]
    },
    "centre d'appel avec support client 24/7": {
        title: ["attarwij Agency offre un service client disponible 24 heures sur 24, 7 jours sur 7. Les clients peuvent contacter l'agence à tout moment pour obtenir de l'aide ou des informations"],
        options: ["retour"]
    },
    "confirmation téléphonique": {
        title: ["ce service implique la vérification d'informations ou de rendez-vous par téléphone. Attarwij Agency peut appeler pour confirmer des détails importants avec les clients ou les partenaires"],
        options: ["Retour"]
    },
    "suivi personnalisé": {
        title: ["attarwij Agency assure un suivi individualisé avec chaque client. Cela peut inclure le suivi des demandes, des commandes ou des questions spécifiques, afin de garantir une satisfaction client maximale"],
        options: ["retour"]
    },
    "assistance multilingue": {
        title: ["pour répondre aux besoins d'une clientèle diversifiée, Attarwij Agency offre un support dans plusieurs langues. Cela permet de communiquer efficacement avec des clients de différentes origines linguistiques"],
        options: ["retour"]
    },
    "suivi des appels et analyse des données": {
        title: ["l'agence surveille les appels entrants et sortants afin de recueillir des données pertinentes. Ces données sont ensuite analysées pour obtenir des insights utiles qui peuvent aider à améliorer les opérations ou les services client."],
        options: ["retour"]
    },
    "gestion des appels entrants et sortants": {
        title: ["attarwij Agency prend en charge à la fois les appels entrants (des clients vers l'agence) et les appels sortants (de l'agence vers les clients ou partenaires). Cela garantit une gestion efficace des communications dans les deux sens."],
        options: ["retour"]
    },
    "réponse rapide et personnalisée": {
        title: ["on s'engage à fournir des réponses rapides et adaptées aux besoins spécifiques de chaque client. Cela contribue à une expérience client positive en répondant efficacement aux demandes et aux questions"],
        options: ["retour"]
    },
    "marketing digital": {
        title: ["boostez votre visibilité en ligne et atteignez vos objectifs commerciaux grâce à nos stratégies de marketing digital. Nous offrons des solutions sur mesure pour améliorer votre présence sur les réseaux sociaux, optimiser votre site pour les moteurs de recherche, et lancer des campagnes publicitaires efficaces"],
        options: [
            "marketing d'influence", 
            "stratégie de contenu et gestion des réseaux sociaux", 
            "publicité en ligne (Google Ads, Facebook Ads)", 
            "seo (optimisation pour les moteurs de recherche)", 
            "marketing par courriel", 
            "analyse des performances et rapports détaillés", 
            "retour"
        ]
    },
    "marketing d'influence": {
        title: ["c'est une stratégie où Attarwij collabore avec des influenceurs sur les réseaux sociaux pour promouvoir les produits ou services de ses clients. Les influenceurs ont une base de fans engagés qui peuvent être ciblés pour atteindre un public spécifique."],
        options: ["retour"]
    },
    "stratégie de contenu et gestion des réseaux sociaux": {
        title: ["attarwij développe des stratégies de contenu pour ses clients, en créant du contenu pertinent et attractif sur les réseaux sociaux. Cela inclut la planification de publications, la gestion des interactions avec les abonnés et la gestion de la réputation en ligne."],
        options: ["retour"]
    },
    "publicité en ligne (google ads, facebook ads)": {
        title: ["attarwij gère des campagnes publicitaires en ligne à travers des plateformes telles que Instagram, Facebook ,Google. Ces campagnes visent à augmenter la visibilité et le trafic vers les projets des clients en utilisant des annonces payantes ciblées."],
        options: ["retour"]
    },
    "seo (optimisation pour les moteurs de recherche)": {
        title: ["attarwij optimise le contenu et la structure des sites web de ses clients pour améliorer leur classement dans les résultats des moteurs de recherche comme Google. Cela inclut l'optimisation des mots-clés, l'amélioration de la convivialité du site et la création de liens (backlinks)."],
        options: ["Retour"]
    },
    "marketing par courriel": {
        title: ["attarwij développe et exécute des campagnes de marketing par courriel ciblées. Cela inclut la création de listes de diffusion, la conception de courriels attrayants et pertinents, et l'analyse des performances des campagnes pour optimiser les taux d'ouverture et de conversion."],
        options: ["retour"]
    },
    "analyse des performances et rapports détaillés": {
        title: ["attarwij surveille et analyse les performances de toutes les activités marketing numériques mises en œuvre pour ses clients. Des rapports détaillés sont fournis régulièrement, fournissant des insights précieux sur l'efficacité des stratégies et des campagnes."],
        options: ["Retour"]
    },
    "ventes": {
        title: ["augmentez vos revenus grâce à nos services de vente professionnels. Nous aidons à développer des stratégies de vente efficaces, à former vos équipes de vente, et à mettre en œuvre des processus qui améliorent la conversion et la fidélisation des clients."],
        options: [
            "prospection", 
            "négociation et Confirmation", 
            "coordination des livraisons et techniques de vente adaptées", 
            "formation et coaching des équipes de vente", 
            "développement de stratégies de vente", 
            "gestion des relations clients (CRM)", 
            "analyse des données de vente", 
            "techniques de vente avancées", 
            "retour"
        ]
    },
    "prospection": {
        title: ["prospection", "identification et ciblage de nouveaux prospects."],
        options: ["retour"]
    },
    "négociation et confirmation": {
        title: ["négociation et confirmation", "gestion des discussions et finalisation des détails de vente."],
        options: ["retour"]
    },
    "coordination des livraisons et techniques de vente adaptées": {
        title: ["organisation logistique des livraisons et adaptation des techniques de vente aux besoins spécifiques."],
        options: ["retour"]
    },
    "formation et coaching des équipes de vente": {
        title: ["programme de formation sur les techniques de vente et coaching pour améliorer les performances des équipes"],
        options: ["retour"]
    },
    "développement de stratégies de vente": {
        title: ["création de plans stratégiques pour atteindre les objectifs commerciaux à long terme."],
        options: ["retour"]
    },
    "gestion des relations clients (crm)": {
        title: ["utilisation de systèmes crm pour gérer efficacement les interactions et renforcer la fidélisation client"],
        options: ["retour"]
    },
    "analyse des données de vente": {
        title: ["évaluation des performances des ventes pour optimiser les stratégies commerciales."],
        options: ["retour"]
    },
    "techniques de vente avancées": {
        title: ["utilisation de méthodes sophistiquées comme la vente consultative pour améliorer les résultats de vente"],
        options: ["retour"]
    },
    "création de site web": {
        title: ["faites briller votre entreprise en ligne avec un site web professionnel et attrayant. Nous concevons et développons des sites web sur mesure qui répondent à vos besoins spécifiques, tout en offrant une expérience utilisateur exceptionnelle."],
        options: [
            "conception web personnalisée", 
            "développement de sites responsives", 
            "intégration de systèmes de gestion de contenu (cms)", 
            "optimisation pour les moteurs de recherche (seo)", 
            "maintenance et mises à jour régulières", 
            "retour"
        ]
    },
    "conception web personnalisée": {
        title: ["attarwij crée des sites web sur mesure en fonction des besoins spécifiques de chaque client. Cela inclut la conception graphique, l'architecture de l'information et l'ergonomie du site pour assurer une expérience utilisateur optimale."],
        options: ["retour"]
    },
    "développement de sites responsives": {
        title: ["les sites développés par Attarwij sont conçus pour être compatibles avec tous les appareils (ordinateurs de bureau, tablettes, smartphones). Cela garantit une accessibilité maximale et une navigation fluide quel que soit le dispositif utilisé par l'utilisateur."],
        options: ["retour"]
    },
    "intégration de systèmes de gestion de contenu (cms)": {
        title: ["attarwij intègre des cms pour permettre aux clients de gérer facilement le contenu de leur site web. Cela inclut la création de modèles personnalisés et l'installation de fonctionnalités spécifiques selon les besoins du client."],
        options: ["retour"]
    },
    "optimisation pour les moteurs de recherche (seo)": {
        title: ["l'agence optimise le contenu et la structure des sites web pour améliorer leur visibilité dans les résultats des moteurs de recherche comme google. Cela comprend l'utilisation de mots-clés pertinents, l'optimisation des balises html, l'amélioration de la vitesse de chargement du site, et la création de liens (backlinks)."],
        options: ["retour"]
    },
    "maintenance et mises à jour régulières": {
        title: ["attarwij assure la maintenance continue des sites web, y compris la résolution de problèmes techniques, la sauvegarde régulière des données et la mise à jour des logiciels et des plugins. Cette gestion proactive garantit que les sites restent sécurisés, fonctionnels et à jour avec les dernières normes et exigences technologiques."],
        options: ["retour"]
    },
    "création de contenu": {
        title: ["attirez et engagez votre audience avec du contenu de haute qualité. Nos services de création de contenu incluent la rédaction de textes, la production de vidéos, la création de visuels, et bien plus encore, pour renforcer votre message et augmenter votre portée."],
        options: [
            "stratégie de contenu et planification éditoriale", 
            "rédaction d'articles et de blogs", 
            "shooting et photographie professionnelle", 
            "création de vidéos et animations", 
            "design graphique et création de visuels", 
            "contenu pour les réseaux sociaux", 
            "retour"
        ]
    },
    "stratégie de contenu et planification éditoriale": {
        title: ["attarwij développe des stratégies de contenu sur mesure pour ses clients, en alignant les objectifs commerciaux avec les besoins et les intérêts de leur public cible. Cela inclut la planification de calendriers éditoriaux pour assurer une cohérence et une pertinence constantes du contenu."],
        options: ["retour"]
    },
    "rédaction d'articles et de blogs": {
        title: ["l'agence rédige des articles et des blogs optimisés pour le référencement (seo), fournissant un contenu informatif et engageant qui attire et informe le public tout en renforçant l'autorité et la crédibilité de chaque entreprise cliente."],
        options: ["retour"]
    },
    "shooting et photographie professionnelle": {
        title: ["attarwij organise des séances de prise de vue professionnelle pour produire des images de haute qualité qui captent l'attention et renforcent la présence visuelle de chaque entreprise cliente."],
        options: ["retour"]
    },
    "création de vidéos et animations": {
        title: ["l'agence crée des vidéos et des animations attirantes pour promouvoir les produits, expliquer des concepts complexes, ou simplement divertir et engager le public cible."],
        options: ["retour"]
    },
    "design graphique et création de visuels": {
        title: ["attarwij réalise des designs graphiques attrayants et efficaces, que ce soit pour des publications sur les réseaux sociaux, des infographies, des bannières publicitaires, ou d'autres supports visuels nécessaires à la stratégie de communication d'une entreprise"],
        options: ["retour"]
    },
    "contenu pour les réseaux sociaux": {
        title: ["l'agence développe du contenu adapté aux plateformes de réseaux sociaux, telles que des posts, des stories, des vidéos courtes, et d'autres formats pour maximiser l'engagement et interagir de manière efficace avec la communauté en ligne."],
        options: ["retour"]
    }
};

var len1 = data.chatinit.title.length;
var j = 0;

function initChat() {
    
    j = 0;
    cbot.innerHTML = '';
    for (var i = 0; i < len1; i++) {
        setTimeout(handleChat, i * 500);
    }
    setTimeout(function () {
        showOptions(data.chatinit.options);
    }, (len1 + 1) * 500);
}

function handleChat() {
    var elm = document.createElement("p");
    elm.innerHTML = data.chatinit.title[j];
    elm.setAttribute("class", "msg");
    cbot.appendChild(elm);
    j++;
    handleScroll();
}

function showOptions(options) {
    for (var i = 0; i < options.length; i++) {
        var opt = document.createElement("span");
        var inp = '<div>' + options[i] + '</div>';
        opt.innerHTML = inp;
        opt.setAttribute("class", "opt");
        opt.addEventListener("click", handleOpt);
        cbot.appendChild(opt);
        handleScroll();
    }
}

function handleOpt() {
    var str = this.innerText.toLowerCase().trim(); 
    document.querySelectorAll(".opt").forEach(el => {
        el.remove();
    });
    var elm = document.createElement("p");
    elm.setAttribute("class", "test");
    var sp = '<span class="rep">' + this.innerText + '</span>';
    elm.innerHTML = sp;
    cbot.appendChild(elm);

    if (str === 'retour') {
        initChat();
    } else if (data[str]) {
        var tempObj = data[str];
        handleResults(tempObj.title, tempObj.options);
    } else {
        handleDelay("Option non gérée");
    }
}

function handleDelay(title) {
    var elm = document.createElement("p");
    elm.innerHTML = title;
    elm.setAttribute("class", "msg");
    cbot.appendChild(elm);
    handleScroll();
}

function handleResults(title, options) {
    for (let i = 0; i < title.length; i++) {
        setTimeout(function () {
            handleDelay(title[i]);
        }, i * 500);
    }

    setTimeout(function () {
        showOptions(options);
    }, title.length * 500);
}

function handleScroll() {
    var elem = document.getElementById('chat-box');
    elem.scrollTop = elem.scrollHeight;
}
