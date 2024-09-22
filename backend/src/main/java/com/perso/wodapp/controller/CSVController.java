package com.perso.wodapp.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.PrintWriter;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class CSVController {

    @GetMapping("/api/download/csv")
    public void downloadCSV(HttpServletResponse response) throws IOException {
        // Définir le type de contenu et les en-têtes
        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=\"export.csv\"");

        // Obtenir un PrintWriter pour écrire dans la réponse
        PrintWriter writer = response.getWriter();

        // Écrire les en-têtes du CSV
        writer.println("Nom,Prenom,Age");

        // Écrire les données du CSV
        writer.println("Dupont,Jean,30");
        writer.println("Durand,Marie,25");
        writer.println("Martin,Paul,35");

        // Fermer le flux
        writer.flush();
        writer.close();
    }
}