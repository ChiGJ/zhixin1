package com.zhixin.action.front;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class IndexAction {
    @RequestMapping("/index")
    private String index() {
        return "front/index/index";
    }
    
        @RequestMapping("/openzhixin")
    private String zhixin() {
        return "front/xinshi/xinshitopic";
    }
}