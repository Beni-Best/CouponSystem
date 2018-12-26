package coupon.sys.core.web;


import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 
 *Register Our filters
 *
 */
@Configuration
public class AppConfig {

	 @Bean
	 public FilterRegistrationBean < AdminFilter > AdminRegistrationBean() {
	  FilterRegistrationBean < AdminFilter > registrationBean = new FilterRegistrationBean<>();
	  registrationBean.setFilter(new AdminFilter());
	  registrationBean.addUrlPatterns("/admin/*");
	  return registrationBean;
	 }
	 
	 @Bean
	 public FilterRegistrationBean < CompanyFilter > CompanyRegistrationBean() {
	  FilterRegistrationBean < CompanyFilter > registrationBean = new FilterRegistrationBean<>();
	  registrationBean.setFilter(new CompanyFilter());
	  registrationBean.addUrlPatterns("/company/*");
	  return registrationBean;
	 }
	 
	 @Bean
	 public FilterRegistrationBean < CustomerFilter > CustomerRegistrationBean() {
	  FilterRegistrationBean < CustomerFilter > registrationBean = new FilterRegistrationBean<>();
	  registrationBean.setFilter(new CustomerFilter());
	  registrationBean.addUrlPatterns("/customer/*");
	  return registrationBean;
	 }
	}