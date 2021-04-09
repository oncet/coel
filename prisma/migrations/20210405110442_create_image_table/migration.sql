-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "file" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
