package com.tec.ce.datos2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
//17:47 del video1

@Controller
public class WishController {

	@GetMapping("/wishMe")
	public String greet(@RequestParam("name") String name,Model model) {
		String message="welcome"+name;
		model.addAttribute("message",message);
		
		
		return "home";
		
	}
	
}
