# Login
1. Default password: admin/admin (Security Misconfiguration)
2. Password hidden in source code (Broken Authentication)
3. Password hidden in /level3/pwd.txt (via /level3/img.png) (Broken Access Control)
4. Password hash exposed in error message (displayed on screen) (Sensitive Data Exposure / Security Misconfiguration)
5. Password hash exposed in error message (find via dev tools) (Sensitive Data Exposure / Security Misconfiguration)
6. Password hidden in front-end code (find via dev tools) (Broken Authentication)
7. Trick browser by manually adding entry to local storage (Insecure Deserialization)
