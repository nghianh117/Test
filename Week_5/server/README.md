docker run --name demo-postgres -e POSTGRES_PASSWORD=password1234 -p 5432:5432 -d postgres


docker run -p 8081:80 \
    --name demo-pgadmin \
    --link demo-postgres:db \
    -e 'PGADMIN_DEFAULT_EMAIL=nghiasin1@gmail.com' \
    -e 'PGADMIN_DEFAULT_PASSWORD=123qweasdzxc4rfv' \
    -d dpage/pgadmin4


prisma

npm install prisma --save-dev
npm install @prisma/client --save
npx prisma
npx prisma init
npx prisma migrate
npx prisma migrate dev
npx prisma generate
