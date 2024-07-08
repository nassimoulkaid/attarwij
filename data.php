<?php
// Configuration de la base de données
$servername = "localhost";
$username = "root";
$password = "IMCO2024@";
$dbname = "contact";

// Création de la connexion
$conn = mysqli_connect($servername, $username, $username, $dbname);

// Vérification de la connexion
if (!$conn) {
    die("La connexion a échoué : " . mysqli_connect_error());
}

// Vérification si le formulaire est soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération des données du formulaire
    $full_name = mysqli_real_escape_string($conn, $_POST["fullname"]);
    $email = mysqli_real_escape_string($conn, $_POST["email"]);
    $phone_number = mysqli_real_escape_string($conn, $_POST["phone"]);
    $company_name = mysqli_real_escape_string($conn, $_POST["company"]);
    $message = mysqli_real_escape_string($conn, $_POST["message"]);

    // Récupération des services sélectionnés et s'assurer que c'est un tableau
    $services = isset($_POST["services"]) ? $_POST["services"] : [];
    $services_str = implode(", ", $services);

    // Construction de la requête SQL
    $sql = "INSERT INTO client (full_name, email, phone_number, company_name, `message`, services) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssss", $full_name, $email, $phone_number, $company_name, $message, $services_str);

    // Exécution de la requête SQL
    if ($stmt->execute()) {
        echo "success";
    } else {
        echo "Erreur : " . $stmt->error;
    }

    // Fermeture de la déclaration
    $stmt->close();
}

// Fermeture de la connexion
mysqli_close($conn);
?>