# PROYECTO 1

## Ver usuarios con su UID

```
cat /etc/passwd | awk -F ':' '{print $1, $3}'
```