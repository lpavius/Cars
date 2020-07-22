package com.renault.services;

import com.renault.models.Role;
import com.renault.models.User;
import com.renault.repositories.RoleRepository;
import com.renault.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void verifyUser(String username, String password) {
        // (1) load the user
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        // (2) verify password
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("bad credentials" + username);
        }
    }

    @Override
    @Transactional
    public void registerUser(String username, String password) {
        Role role = roleRepository.findById("USER").orElseThrow();
        User user = new User(username, passwordEncoder.encode(password), true, role);
        userRepository.save(user);
    }


}
