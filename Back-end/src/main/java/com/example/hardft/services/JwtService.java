package com.example.hardft.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    private String SECRET_KEY = "HARDFIT";
    private long TEMPO_DE_EXPIRACAO = 1000*60*60*2;

    private Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);

    public String gerarToken(String login){
        return JWT.create()
                .withSubject(login)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + TEMPO_DE_EXPIRACAO))
                .sign(algorithm);
    }

    public String extrairToken(String token) {
        return JWT.require(algorithm).build().verify(token).getSubject();
    }

    public boolean tokenEValido(String token) {
        try {
            JWT.require(algorithm).build().verify(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
