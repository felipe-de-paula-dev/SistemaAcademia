package com.example.hardft.controllers.Auth;
import com.example.hardft.dto.AuthRequest;
import com.example.hardft.dto.RegistroDto;
import com.example.hardft.entity.User.User;
import com.example.hardft.repositories.UserRepository;
import com.example.hardft.services.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public String login(@RequestBody AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getLogin(),
                        request.getPassword()
                )
        );

        return jwtService.gerarToken(request.getLogin());
    }

    @PostMapping("/registrar")
    public ResponseEntity<String> registrar(@RequestBody RegistroDto dto){
        try {
            if (this.userRepository.findByLogin(dto.login()).isPresent()) {
                return ResponseEntity.badRequest().body("Login já existente.");
            }

            String senhaCriptografada = passwordEncoder.encode(dto.password());
            User novoUsuario = new User(dto.login(), senhaCriptografada);
            this.userRepository.save(novoUsuario);

            return ResponseEntity.ok("Usuário criado com sucesso!");
        }  catch (Exception e) {
            return ResponseEntity.status(400).body("Usuario não foi criado com sucesso " + e);
        }
    }

    @GetMapping("/verificar")
    public ResponseEntity<String> verificar(){
        return ResponseEntity.ok("Ok!");
    }

    @GetMapping("/ping")
    public ResponseEntity<String> ping(){
        return ResponseEntity.ok("Ping Ok!");
    }
}